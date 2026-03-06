import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/content";
import { buildRss } from "@/lib/rss";
import { siteMeta, siteUrl } from "@/lib/siteMeta";
import { summarizeText } from "@/lib/utils";

export async function GET() {
  const articles = getAllContent("articles");
  const notes = getAllContent("notes");

  const articleItems = articles.map((article) => {
    const url = `${siteUrl}/articles/${article.slug}`;
    const pubDate = new Date(article.meta.date).toUTCString();

    return {
      title: article.meta.title,
      link: url,
      guid: url,
      pubDate,
      description: article.meta.summary ?? "",
    };
  });

  const noteItems = notes.map((note) => {
    const url = `${siteUrl}/notes/${note.slug}`;
    const pubDate = new Date(note.meta.date).toUTCString();

    return {
      title: note.meta.title,
      link: url,
      guid: url,
      pubDate,
      description: note.meta.summary ?? summarizeText(note.content),
    };
  });

  const items = [...articleItems, ...noteItems].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );

  const xml = buildRss({
    title: siteMeta.feed.title,
    description: siteMeta.feed.description,
    feedPath: siteMeta.feed.feedPath,
    items,
  });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

