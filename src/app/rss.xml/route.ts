import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/content";
import { buildRss } from "@/lib/rss";
import { siteMeta } from "@/lib/siteMeta";

export async function GET() {
  const articles = getAllContent("articles");

  const items = articles.map((article) => {
    const url = `https://zlokapa.com/articles/${article.slug}`;
    const pubDate = new Date(article.meta.date).toUTCString();

    return {
      title: article.meta.title,
      link: url,
      guid: url,
      pubDate,
      description: article.meta.summary ?? "",
    };
  });

  const xml = buildRss({
    title: siteMeta.articles.title,
    description: siteMeta.articles.description,
    feedPath: siteMeta.articles.feedPath,
    items,
  });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

