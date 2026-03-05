import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/content";
import { buildRss } from "@/lib/rss";
import { siteMeta } from "@/lib/siteMeta";

function summarize(content: string, maxLength = 160): string {
  if (content.length <= maxLength) {
    return content;
  }

  return content.slice(0, maxLength).trimEnd() + "…";
}

export async function GET() {
  const notes = getAllContent("notes");

  const items = notes.map((note) => {
    const url = `https://zlokapa.com/notes/${note.slug}`;
    const pubDate = new Date(note.meta.date).toUTCString();

    return {
      title: note.meta.title,
      link: url,
      guid: url,
      pubDate,
      description: note.meta.summary ?? summarize(note.content),
    };
  });

  const xml = buildRss({
    title: siteMeta.notes.title,
    description: siteMeta.notes.description,
    feedPath: siteMeta.notes.feedPath,
    items,
  });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

