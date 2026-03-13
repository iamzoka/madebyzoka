import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug } from "@/lib/content";
import EntryContent from "@/components/EntryContent";
import { PageProps } from "@/lib/types";
import { siteMeta, siteUrl } from "@/lib/siteMeta";
import PageHeader from "@/partials/PageHeader";

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
    <article className={`c-page c-page--article u-grid ${articleClassName}`}>
      <PageHeader
        title={article.meta.title}
        date={article.meta.date}
        summary={article.meta.summary} 
      />

      <div className="c-page__body">
        <EntryContent contentString={article.content} />

        <p>Have something to add or comment? Feel free to <a href={`mailto:${siteMeta.email}`} title="Email">email me</a> or write me on <a href={siteMeta.blueskyUrl} title="Bluesky">Bluesky</a>.</p>
      </div>
    </article>
  );
}
