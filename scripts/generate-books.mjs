import fs from 'node:fs/promises';
import path from 'node:path';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';
const COVER_BASE_URL = 'https://covers.openlibrary.org/b/isbn';
const DEFAULT_OUTPUT_DIR = path.join(process.cwd(), 'src', 'content', 'books');

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function parseBookLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    return null;
  }

  const separators = [' — ', ' – ', ' - '];
  let separatorIndex = -1;
  let selectedSeparator = '';

  for (const separator of separators) {
    const idx = trimmed.lastIndexOf(separator);
    if (idx > separatorIndex) {
      separatorIndex = idx;
      selectedSeparator = separator;
    }
  }

  if (separatorIndex === -1) {
    return { malformed: true, source: line };
  }

  const title = trimmed.slice(0, separatorIndex).trim();
  const author = trimmed.slice(separatorIndex + selectedSeparator.length).trim();

  if (!title || !author) {
    return { malformed: true, source: line };
  }

  return { title, author };
}

function normalizeForCompare(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function pickBestItem(items, title, author) {
  if (!items.length) return null;

  const normalizedTitle = normalizeForCompare(title);
  const normalizedAuthor = normalizeForCompare(author);

  let bestItem = items[0];
  let bestScore = -Infinity;

  for (const item of items) {
    const info = item.volumeInfo || {};
    const itemTitle = normalizeForCompare(info.title || '');
    const itemAuthor = normalizeForCompare((info.authors || []).join(' '));

    let score = 0;
    if (itemTitle === normalizedTitle) score += 5;
    if (itemTitle.includes(normalizedTitle) || normalizedTitle.includes(itemTitle)) score += 2;
    if (itemAuthor.includes(normalizedAuthor) || normalizedAuthor.includes(itemAuthor)) score += 3;
    if (info.publishedDate) score += 0.5;
    if (info.pageCount) score += 0.5;
    if (info.industryIdentifiers?.length) score += 1;

    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }

  return bestItem;
}

function pickIsbn(isbns = []) {
  const cleaned = isbns
    .map((value) => String(value).replace(/[^0-9Xx]/g, '').toUpperCase())
    .filter(Boolean);

  const isbn13 = cleaned.find((value) => value.length === 13);
  if (isbn13) return isbn13;

  const isbn10 = cleaned.find((value) => value.length === 10);
  return isbn10 || null;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'madebyzoka-book-generator/1.0',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await sleep(400 * 2 ** (attempt - 1));
      }
    }
  }

  throw lastError;
}

async function fetchBookMetadata({ title, author }) {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const params = new URLSearchParams({
    q: `intitle:${title} inauthor:${author}`,
    maxResults: '5',
    printType: 'books',
  });
  if (apiKey) {
    params.set('key', apiKey);
  }
  const url = `${GOOGLE_BOOKS_API_URL}?${params.toString()}`;

  try {
    const payload = await fetchWithRetry(url);
    const items = Array.isArray(payload.items) ? payload.items : [];
    const best = pickBestItem(items, title, author);
    if (!best) {
      return { isbn: null, pageCount: null, yearPublished: null, error: null };
    }

    const info = best.volumeInfo || {};
    const identifiers = Array.isArray(info.industryIdentifiers)
      ? info.industryIdentifiers.map((idObj) => idObj.identifier).filter(Boolean)
      : [];
    const isbn = pickIsbn(identifiers);
    const pageCount = info.pageCount ?? null;
    const yearPublished = parsePublishYear(info.publishedDate);

    return {
      isbn,
      pageCount,
      yearPublished,
      error: null,
    };
  } catch (error) {
    return {
      isbn: null,
      pageCount: null,
      yearPublished: null,
      error: error instanceof Error ? error.message : 'Unknown lookup error',
    };
  }
}

function parsePublishYear(value) {
  if (!value) return null;
  if (typeof value === 'number') return value;
  const match = String(value).match(/\b(1[0-9]{3}|20[0-9]{2})\b/);
  return match ? Number(match[1]) : null;
}

function buildFrontmatter(record) {
  const lines = [
    '---',
    `id: ${yamlString(record.id)}`,
    `title: ${yamlString(record.title)}`,
    `author: ${yamlString(record.author)}`,
    `isbn: ${record.isbn ? yamlString(record.isbn) : 'null'}`,
    `coverImage: ${record.coverImage ? yamlString(record.coverImage) : 'null'}`,
    `pageCount: ${record.pageCount ?? 'null'}`,
    `yearPublished: ${record.yearPublished ?? 'null'}`,
    'yearRead: null',
    'rating: null',
    '---',
    '',
  ];

  return lines.join('\n');
}

async function ensureDir(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

async function createUniqueFilePath(baseDirectory, baseSlug) {
  let candidate = baseSlug;
  let counter = 2;

  while (true) {
    const filePath = path.join(baseDirectory, `${candidate}.md`);
    try {
      await fs.access(filePath);
      candidate = `${baseSlug}-${counter}`;
      counter += 1;
    } catch {
      return { filePath, id: candidate };
    }
  }
}

async function main() {
  const inputPath = process.argv[2];
  const outputDirArg = process.argv[3];

  if (!inputPath) {
    console.error('Usage: node scripts/generate-books.mjs <input.txt> [output-dir]');
    process.exit(1);
  }

  const outputDir = outputDirArg
    ? path.resolve(process.cwd(), outputDirArg)
    : DEFAULT_OUTPUT_DIR;

  const inputAbsolutePath = path.resolve(process.cwd(), inputPath);
  const fileContents = await fs.readFile(inputAbsolutePath, 'utf8');
  const lines = fileContents.split(/\r?\n/);

  await ensureDir(outputDir);

  let created = 0;
  let malformed = 0;
  let lookupErrors = 0;

  for (const [index, line] of lines.entries()) {
    const parsed = parseBookLine(line);
    if (!parsed) continue;
    if (parsed.malformed) {
      malformed += 1;
      console.warn(`Skipping malformed line ${index + 1}: ${parsed.source}`);
      continue;
    }

    const baseSlug = slugify(`${parsed.title}-${parsed.author}`) || `book-${index + 1}`;
    const { filePath, id } = await createUniqueFilePath(outputDir, baseSlug);
    const meta = await fetchBookMetadata(parsed);
    const coverImage = meta.isbn ? `${COVER_BASE_URL}/${meta.isbn}-L.jpg` : null;
    if (meta.error) {
      lookupErrors += 1;
      console.warn(
        `Google Books lookup failed for "${parsed.title}" by "${parsed.author}": ${meta.error}`,
      );
    }

    const frontmatter = buildFrontmatter({
      id,
      title: parsed.title,
      author: parsed.author,
      isbn: meta.isbn,
      coverImage,
      pageCount: meta.pageCount,
      yearPublished: meta.yearPublished,
    });

    await fs.writeFile(filePath, frontmatter, 'utf8');
    created += 1;
    console.log(`Created: ${path.relative(process.cwd(), filePath)}`);
    await sleep(150);
  }

  console.log(`Done. Created ${created} book file(s).`);
  if (malformed > 0) {
    console.log(`Skipped ${malformed} malformed line(s).`);
  }
  if (lookupErrors > 0) {
    console.log(
      `Google Books lookups failed for ${lookupErrors} book(s). Check network access to www.googleapis.com.`,
    );
  }
}

main().catch((error) => {
  console.error('Failed to generate books:', error);
  process.exit(1);
});
