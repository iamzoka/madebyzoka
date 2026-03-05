import { siteUrl } from "./siteMeta";

interface RssItem {
  title: string;
  link: string;
  guid?: string;
  pubDate: string;
  description?: string;
}

interface BuildRssOptions {
  title: string;
  description: string;
  feedPath: string;
  items: RssItem[];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildRss({ title, description, feedPath, items }: BuildRssOptions): string {
  const feedUrl = `${siteUrl}${feedPath}`;
  const lastBuildDate = items[0]?.pubDate ?? new Date().toUTCString();

  const itemsXml = items
    .map((item) => {
      const guid = item.guid ?? item.link;
      const descriptionPart = item.description
        ? `<description>${escapeXml(item.description)}</description>`
        : "";

      return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid>${escapeXml(guid)}</guid>
      <pubDate>${escapeXml(item.pubDate)}</pubDate>
      ${descriptionPart}
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(description)}</description>
    <language>en-US</language>
    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;
}

