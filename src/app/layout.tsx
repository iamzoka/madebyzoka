import type { Metadata } from "next";
import { Roboto, Noto_Serif_Display } from "next/font/google";
import "@/styles/globals.css";
import SiteFooter from "@/partials/SiteFooter";
import SiteHeader from "@/partials/SiteHeader";
import { siteMeta, siteUrl } from "@/lib/siteMeta";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"]
})

const notoSerifDisplay = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata = {
  title: {
    default: siteMeta.title,
    template: "%s – Zoran Zlokapa",
  },
  description: siteMeta.description,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: siteMeta.author,
    title: siteMeta.title,
    description: siteMeta.description,
    locale: siteMeta.locale,
    images: [
      {
        url: siteMeta.ogImage,
        width: siteMeta.ogImageWidth,
        height: siteMeta.ogImageHeight,
        alt: siteMeta.author,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [siteMeta.ogImage],
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: siteMeta.feed.feedPath, title: siteMeta.feed.title },
      ],
    },
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${notoSerifDisplay.variable}`}>
      <body>
        <SiteHeader />

        <main className="l-site-content">
          {children}
        </main>

        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
