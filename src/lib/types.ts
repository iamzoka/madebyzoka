import type { CollectionEntry } from 'astro:content';

export type ContentType = 'articles' | 'notes' | 'books';

export interface ContentMeta {
  title: string;
  date: Date;
  summary: string;
  tags: string[];
  customClass?: string;
}

export interface ContentItem {
  slug: string;
  meta: ContentMeta;
  content: string; // raw MDX/Markdown body
  entry: CollectionEntry<ContentType>;
}

export type BlogLink = {
  title: string;
  description: string;
  url: string;
};

export type BookMeta = {
  isbn?: string | number | null
  title: string;
  author?: string;
  yearPublished?: number | null;
  yearRead?: number | null;
  rating?: number | null;
  pageCount?: number | null;
};
