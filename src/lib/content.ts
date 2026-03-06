import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ContentType, ContentItem, ContentMeta } from './types';
import { summarizeText } from './utils';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content');

function getContentDir(type: ContentType) {
  return path.join(CONTENT_ROOT, type);
}

export function getAllContent(type: ContentType): ContentItem[] {
  const dir = getContentDir(type);
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => {
      const fullPath = path.join(dir, f);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug: f.replace(/\.mdx$/, ''),
        meta: {
          ...data as ContentMeta,
          summary: summarizeText(content),
        },
        content
      };
    })
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export function getContentBySlug(type: ContentType, slug: string): ContentItem | null {
  const dir = getContentDir(type);
  const filePath = path.join(dir, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  
  return {
    slug,
    meta: data as ContentMeta,
    content
  };
}