import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ContentType, ContentItem, ContentMeta } from './types';
import { summarizeText } from './utils';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content');
const DEFAULT_EXTENSIONS = ['.mdx'];
const BOOK_EXTENSIONS = ['.md', '.mdx'];

function getContentDir(type: ContentType) {
  return path.join(CONTENT_ROOT, type);
}

function getAllowedExtensions(type: ContentType): string[] {
  return type === 'books' ? BOOK_EXTENSIONS : DEFAULT_EXTENSIONS;
}

function stripContentExtension(fileName: string): string {
  return fileName.replace(/\.(md|mdx)$/, '');
}

export function getAllContent(type: ContentType): ContentItem[] {
  const dir = getContentDir(type);
  const allowedExtensions = getAllowedExtensions(type);
  return fs.readdirSync(dir)
    .filter(f => allowedExtensions.some(ext => f.endsWith(ext)))
    .map(f => {
      const fullPath = path.join(dir, f);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug: stripContentExtension(f),
        meta: {
          ...data as ContentMeta,
          summary: data.summary ? data.summary : summarizeText(content),
        },
        content
      };
    })
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export function getContentBySlug(type: ContentType, slug: string): ContentItem | null {
  const dir = getContentDir(type);
  const allowedExtensions = getAllowedExtensions(type);
  const filePath = allowedExtensions
    .map(ext => path.join(dir, `${slug}${ext}`))
    .find(p => fs.existsSync(p));

  if (!filePath) {
    return null;
  }
  
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  
  return {
    slug,
    meta: {
      ...data as ContentMeta,
      summary: data.summary ? data.summary : summarizeText(content),
    },
    content
  };
}