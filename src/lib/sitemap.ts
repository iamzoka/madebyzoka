type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SitemapEntry {
  path: string;
  lastModified?: string | Date;
  changefreq?: ChangeFreq;
  priority?: number;
}

export interface BuildSitemapOptions {
  baseUrl: string;
  entries: SitemapEntry[];
}

function normalisePath(path: string): string {
  if (!path.startsWith("/")) {
    return `/${path}`;
  }
  return path;
}

function normaliseBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

function formatLastMod(lastModified?: string | Date): string | null {
  if (!lastModified) return null;

  const date =
    typeof lastModified === "string" ? new Date(lastModified) : lastModified;

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

export function buildSitemap({ baseUrl, entries }: BuildSitemapOptions): string {
  const normalisedBase = normaliseBaseUrl(baseUrl);

  const uniqueByPath = new Map<string, SitemapEntry>();
  for (const entry of entries) {
    const normalisedPath = normalisePath(entry.path);
    uniqueByPath.set(normalisedPath, { ...entry, path: normalisedPath });
  }

  const urlset = Array.from(uniqueByPath.values())
    .map((entry) => {
      const loc = `${normalisedBase}${entry.path}`;
      const lastmod = formatLastMod(entry.lastModified);

      const parts: string[] = [];
      parts.push(`<loc>${loc}</loc>`);
      if (lastmod) {
        parts.push(`<lastmod>${lastmod}</lastmod>`);
      }
      if (entry.changefreq) {
        parts.push(`<changefreq>${entry.changefreq}</changefreq>`);
      }
      if (typeof entry.priority === "number") {
        parts.push(`<priority>${entry.priority.toFixed(1)}</priority>`);
      }

      return `<url>${parts.join("")}</url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urlset +
    `</urlset>`;
}

