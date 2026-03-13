import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug } from "@/lib/content";
import EntryContent from "@/components/EntryContent";
import { PageProps } from "@/lib/types";
import { siteMeta, siteUrl } from "@/lib/siteMeta";
import ArticleHeader from "@/partials/PageHeader";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getContentBySlug("notes", slug);

  if (!note) {
    return {};
  }

  const url = new URL(`/notes/${slug}`, siteUrl).toString();

  return {
    title: note.meta.title,
    description: note.meta.title,
    openGraph: {
      type: "article",
      url,
      title: note.meta.title,
      description: note.meta.title,
      siteName: siteMeta.author,
      publishedTime: note.meta.date,
      tags: note.meta.tags,
      images: [
        {
          url: siteMeta.ogImage,
          width: siteMeta.ogImageWidth,
          height: siteMeta.ogImageHeight,
          alt: note.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: note.meta.title,
      description: note.meta.title,
      images: [siteMeta.ogImage],
    },
  };
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getContentBySlug("notes", slug);
  const noteClassName = note?.meta.customClass ? `c-page--note-${note.meta.customClass}` : "";

  if (!note) {
    notFound();
  }

  return (
    <article className={`c-page c-page--note u-grid ${noteClassName}`}>
      <ArticleHeader
        title={note.meta.title}
        date={note.meta.date}
      />

      <div className="c-page__body">
        <EntryContent contentString={note.content} />
      </div>
    </article>
  );
}
