import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug } from "@/lib/content";
import EntryContent from "@/components/EntryContent";
import { PageProps } from "@/lib/types";
import { siteMeta, siteUrl } from "@/lib/siteMeta";

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
    <article className={`c-page c-page--note ${noteClassName}`}>
      <header className="c-page__header">
        <div className="u-container">
          <h1 className="c-page__title">{note.meta.title}</h1>

          <p className="c-page__date">
            {new Date(note.meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </header>

      <div className="c-page__body u-grid">
        <EntryContent contentString={note.content} />
      </div>
    </article>
  );
}
