import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentType = "articles" | "notes";

export interface ContentMeta {
  title: string;
  date: string;        // ISO string
  summary?: string;
  tags?: string[];
}

export interface ContentItem {
  slug: string;
  meta: ContentMeta;
  content: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "src/content");

function getContentDir(type: ContentType) {
  return path.join(CONTENT_ROOT, type);
}

export function getAllContent(type: ContentType): ContentItem[] {
  const dir = getContentDir(type);
  const files = fs.readdirSync(dir);

  return files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\\.mdx?$/, "");
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, "utf-8");

      const { data, content } = matter(raw);

      return {
        slug,
        meta: data as ContentMeta,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() -
        new Date(a.meta.date).getTime()
    );
}