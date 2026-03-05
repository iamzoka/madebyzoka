import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug } from "@/lib/content";
import EntryContent from "@/components/EntryContent";
import { PageProps } from "@/lib/types";
import { siteMeta, siteUrl } from "@/lib/siteMeta";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getContentBySlug("articles", slug);

  if (!article) {
    return {};
  }

  const url = new URL(`/articles/${slug}`, siteUrl).toString();

  return {
    title: article.meta.title,
    description: article.meta.summary,
    openGraph: {
      type: "article",
      url,
      title: article.meta.title,
      description: article.meta.summary,
      siteName: siteMeta.author,
      publishedTime: article.meta.date,
      tags: article.meta.tags,
      images: [
        {
          url: siteMeta.ogImage,
          width: siteMeta.ogImageWidth,
          height: siteMeta.ogImageHeight,
          alt: article.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta.title,
      description: article.meta.summary,
      images: [siteMeta.ogImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getContentBySlug("articles", slug);
  const articleClassName = article?.meta.customClass ? `c-page--article-${article.meta.customClass}` : "";

  if (!article) {
    notFound();
  }

  return (
    <article className={`c-page c-page--article ${articleClassName}`}>
      <header className="c-page__header">
        <div className="u-container">
          <h1 className="c-page__title">{article.meta.title}</h1>

          <p className="c-page__date">
            {new Date(article.meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="c-page__summary">
            {article.meta.summary && <p>{article.meta.summary}</p>}
          </div>
        </div>
      </header>

      <div className="c-page__body u-grid">
        <EntryContent contentString={article.content} />
      </div>
    </article>
  );
}
