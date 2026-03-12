import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = process.cwd();
const CONTENT_ROOT = path.join(PROJECT_ROOT, 'src', 'content');

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function prompt(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function getNowLocalIso() {
  const now = new Date();
  const tzOffsetMs = now.getTimezoneOffset() * 60000;
  const local = new Date(now.getTime() - tzOffsetMs);
  return local.toISOString().slice(0, 19);
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildFrontmatter({ type, title, tags, date, summary }) {
  const tagsArray = tags.map((t) => `"${t}"`).join(', ');

  const lines = [
    '---',
    `title: ${title}`,
  ];

  if (type === 'articles') {
    lines.push(`summary: ${summary || 'TODO: add summary'}`);
  }

  lines.push(`date: ${date}`);
  lines.push(`tags: [${tagsArray}]`);
  lines.push('---', '', 'Write something interesting here.');

  return lines.join('\n');
}

async function main() {
  const rl = createInterface();

  try {
    const typeInput = await prompt(
      rl,
      'Type (article/note, a/n): ',
    );

    let type;
    const normalized = typeInput.toLowerCase();
    if (normalized === 'a' || normalized === 'article' || normalized === 'articles') {
      type = 'articles';
    } else if (normalized === 'n' || normalized === 'note' || normalized === 'notes') {
      type = 'notes';
    } else {
      console.error('Invalid type. Please enter "article" or "note".');
      process.exitCode = 1;
      return;
    }

    const title = await prompt(rl, 'Title: ');
    if (!title) {
      console.error('Title is required.');
      process.exitCode = 1;
      return;
    }

    const tagsInput = await prompt(
      rl,
      'Tags (comma-separated, e.g. design, life, business): ',
    );

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const nowIso = getNowLocalIso();
    const datePart = nowIso.slice(0, 10);

    const baseSlug = slugify(title);
    let slug;

    if (type === 'notes') {
      slug = `${datePart}-${baseSlug}`;
    } else {
      slug = baseSlug;
    }

    const dir = path.join(CONTENT_ROOT, type);
    const filePath = path.join(dir, `${slug}.mdx`);

    if (!fs.existsSync(dir)) {
      console.error(`Directory does not exist: ${dir}`);
      process.exitCode = 1;
      return;
    }

    if (fs.existsSync(filePath)) {
      console.error(`File already exists: ${filePath}`);
      process.exitCode = 1;
      return;
    }

    const frontmatter = buildFrontmatter({
      type,
      title,
      tags,
      date: nowIso,
      summary: '',
    });

    fs.writeFileSync(filePath, frontmatter, 'utf8');
    console.log(`Created ${type.slice(0, -1)}: ${filePath}`);
  } catch (err) {
    console.error('Error creating content file:', err);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

main();

