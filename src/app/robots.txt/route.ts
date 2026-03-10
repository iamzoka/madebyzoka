import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/siteMeta";

export async function GET() {
  const lines = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ];

  const body = lines.join("\n");

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

