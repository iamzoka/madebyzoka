import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Keep slugs identical to the file names (same as the previous fs-based loader).
const generateId = ({ entry }: { entry: string }) => entry.replace(/\.(md|mdx)$/, "");

const entrySchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  summary: z.string().optional(),
  tags: z.array(z.string()).default([]),
  customClass: z.string().optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/articles", generateId }),
  schema: entrySchema,
});

const notes = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/notes", generateId }),
  schema: entrySchema,
});

const books = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/books", generateId }),
  schema: z.looseObject({
    title: z.coerce.string(),
    author: z.string().nullish(),
    isbn: z.union([z.string(), z.number()]).nullish(),
    pageCount: z.number().nullish(),
    yearPublished: z.number().nullish(),
    yearRead: z.number().nullish(),
    rating: z.number().nullish(),
  }),
});

export const collections = { articles, notes, books };
