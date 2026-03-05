export type ContentType = 'articles' | 'notes';

export interface ContentMeta {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
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

