import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { AtpAgent, RichText } from "@atproto/api";
import { siteUrl } from "@/lib/siteMeta";

interface ContentPost {
  title: string;
  summary: string;
  url: string;
  contentType: "articles" | "notes";
}

// ---------------------------------------------------------------------------
// Parse MDX file into a ContentPost
// ---------------------------------------------------------------------------

function parseContentFile(filePath: string): ContentPost {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const segments = filePath.split(path.sep);
  const contentIdx = segments.indexOf("content");
  if (contentIdx === -1) {
    throw new Error(`Cannot determine content type from path: ${filePath}`);
  }

  const contentType = segments[contentIdx + 1] as "articles" | "notes";
  const slug = path.basename(filePath, ".mdx");
  const url = `${siteUrl}/${contentType}/${slug}`;

  const title: string = data.title ?? slug;
  const summary: string =
    data.summary ??
    content
      .replace(/[#*_`~>\[\]()!]/g, "")
      .replace(/\n+/g, " ")
      .trim()
      .slice(0, 160);

  return { title, summary, url, contentType };
}

// ---------------------------------------------------------------------------
// Build post text that fits within Bluesky's 300-grapheme limit
// ---------------------------------------------------------------------------

function buildPostText(post: ContentPost): string {
  const prefix =
    post.contentType === "articles" ? `I wrote a new article: ${post.title}\n\n` : "";
  const suffix = `\n\n${post.url}`;
  const budget = 300 - [...prefix].length - [...suffix].length;

  if (budget <= 0) {
    return `${prefix}${post.url}`.slice(0, 300);
  }

  const summaryTrimmed =
    [...post.summary].length > budget
      ? [...post.summary].slice(0, budget - 1).join("") + "…"
      : post.summary;

  return `${prefix}${summaryTrimmed}${suffix}`;
}

// ---------------------------------------------------------------------------
// Bluesky poster
// ---------------------------------------------------------------------------

async function postToBluesky(text: string): Promise<string> {
  const handle = process.env.BLUESKY_HANDLE;
  const password = process.env.BLUESKY_APP_PASSWORD;

  if (!handle || !password) {
    throw new Error(
      "Missing BLUESKY_HANDLE or BLUESKY_APP_PASSWORD environment variables"
    );
  }

  const agent = new AtpAgent({ service: "https://bsky.social" });
  await agent.login({ identifier: handle, password });

  const rt = new RichText({ text });
  await rt.detectFacets(agent);

  const res = await agent.post({
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString(),
  });

  return res.uri;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const files = process.argv.slice(2);

  if (files.length === 0) {
    console.log("No files provided — nothing to cross-post.");
    process.exit(0);
  }

  const dryRun = process.env.DRY_RUN === "true";

  for (const file of files) {
    const resolved = path.resolve(file);

    if (!fs.existsSync(resolved)) {
      console.warn(`File not found, skipping: ${file}`);
      continue;
    }

    const post = parseContentFile(resolved);
    const text = buildPostText(post);

    console.log(`\n--- ${post.contentType}/${path.basename(file)} ---`);
    console.log(text);
    console.log(`(${[...text].length} graphemes)`);

    if (dryRun) {
      console.log("[dry-run] Skipping Bluesky post.");
      continue;
    }

    try {
      const uri = await postToBluesky(text);
      console.log(`Posted to Bluesky: ${uri}`);
    } catch (err) {
      console.error(`Failed to post to Bluesky:`, err);
      process.exit(1);
    }
  }
}

main();
