export type ContentType = 'articles' | 'notes' | 'books';

export interface ContentMeta {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  customClass?: string;
}

export interface ContentItem {
  slug: string;
  meta: ContentMeta;
  content: string; // MDX string
}

export interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export type BlogLink = {
  title: string;
  description: string;
  url: string;
};

export type BookMeta = {
  isbn?: string;
  title: string;
  author?: string;
  yearPublished?: number;
  yearRead?: number;
  rating?: number;
  pageCount?: number;
};
