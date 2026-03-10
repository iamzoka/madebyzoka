import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/content";
import { siteUrl } from "@/lib/siteMeta";
import { buildSitemap, SitemapEntry } from "@/lib/sitemap";

const STATIC_SITEMAP_PATHS: SitemapEntry[] = [
  {
    path: "/",
    changefreq: "daily",
    priority: 1.0,
  },
  {
    path: "/about",
    changefreq: "monthly",
    priority: 0.7,
  },
  {
    path: "/articles",
    changefreq: "weekly",
    priority: 0.8,
  },
  {
    path: "/notes",
    changefreq: "weekly",
    priority: 0.7,
  },
  {
    path: "/uses",
    changefreq: "yearly",
    priority: 0.3,
  },
  {
    path: "/blogroll",
    changefreq: "monthly",
    priority: 0.4,
  },
  {
    path: "/ideas",
    changefreq: "monthly",
    priority: 0.4,
  },
  {
    path: "/resume",
    changefreq: "yearly",
    priority: 0.5,
  },
];

export async function GET() {
  const articles = getAllContent("articles");
  const notes = getAllContent("notes");

  const articleEntries: SitemapEntry[] = articles.map((article) => ({
    path: `/articles/${article.slug}`,
    lastModified: article.meta.date,
    changefreq: "weekly",
    priority: 0.8,
  }));

  const noteEntries: SitemapEntry[] = notes.map((note) => ({
    path: `/notes/${note.slug}`,
    lastModified: note.meta.date,
    changefreq: "weekly",
    priority: 0.6,
  }));

  const entries: SitemapEntry[] = [
    ...STATIC_SITEMAP_PATHS,
    ...articleEntries,
    ...noteEntries,
  ];

  const xml = buildSitemap({
    baseUrl: siteUrl,
    entries,
  });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

