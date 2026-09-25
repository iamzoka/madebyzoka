import { getCollection, getEntry } from 'astro:content';
import type { ContentType, ContentItem, ContentMeta } from './types';
import { summarizeText } from './utils';

type AnyEntry = ContentItem['entry'];

function toContentItem(entry: AnyEntry): ContentItem {
  const data = entry.data as Record<string, unknown>;
  const content = entry.body ?? '';

  return {
    slug: entry.id,
    meta: {
      ...data as unknown as ContentMeta,
      summary: data.summary ? String(data.summary) : summarizeText(content),
    },
    content,
    entry,
  };
}

function getTime(date: ContentMeta['date'] | undefined): number {
  return date ? new Date(date).getTime() : NaN;
}

export async function getAllContent(type: ContentType): Promise<ContentItem[]> {
  const entries = await getCollection(type);

  return entries
    .map(toContentItem)
    .sort((a, b) => getTime(b.meta.date) - getTime(a.meta.date));
}

export async function getContentBySlug(type: ContentType, slug: string): Promise<ContentItem | null> {
  const entry = await getEntry(type, slug);

  return entry ? toContentItem(entry) : null;
}
