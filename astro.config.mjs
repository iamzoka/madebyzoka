// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import { unified } from "@astrojs/markdown-remark";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  site: "https://zlokapa.com",
  output: "static",
  adapter: vercel(),
  // The Vercel adapter serves /path from path/index.html and 308-redirects /path/ to /path.
  trailingSlash: "never",
  server: {
    port: 3000,
  },
  prefetch: {
    prefetchAll: true,
    // Prefetch links as they scroll into view instead of on hover.
    defaultStrategy: "viewport",
  },
  build: {
    // The single stylesheet is ~3 KB compressed; inlining saves a render-blocking request.
    inlineStylesheets: "always",
  },
  integrations: [mdx()],
  markdown: {
    // Same pipeline next-mdx-remote used: GFM, heading ids and heading anchors, no SmartyPants.
    processor: unified({
      gfm: false,
      smartypants: false,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    }),
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Noto Serif Display",
      cssVariable: "--font-noto-serif-display",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
});
