# A personal website of web designer and developer Zoran Zlokapa

The site started on Next.js and has since been migrated to [Astro](https://astro.build). It is fully static:
articles, notes and books are Markdown/MDX files in `src/content` loaded through Astro content collections,
and it deploys to Vercel with `@astrojs/vercel`.

## Getting Started

First, run the development server:

```bash
npm run dev      # dev server (runs in the background; `npx astro dev stop` to stop it)
npm run build    # static build into dist/ and .vercel/output
npm run start    # preview the production build
npm run check    # type-check .astro and .ts files
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Generate Book Markdown Files

Helper script to convert a plain text list into one markdown file per book.

```bash
npm run books:generate -- data/books.txt
```

Input format (`data/books.txt`):

```txt
Book Title — Author Name
Another Book - Another Author
```

Output:
- Files are created in `src/content/books` by default.
- Each file contains frontmatter fields: `id`, `title`, `author`, `isbn`, `coverImage`, `pageCount`, `yearPublished`, `yearRead: null`, `rating: null`.
- Metadata (`isbn`, `pageCount`, `yearPublished`) is fetched from Google Books API.
- Optional API key: set `GOOGLE_BOOKS_API_KEY` to increase quota/reliability.
- Optional custom output directory:

```bash
npm run books:generate -- data/books.txt src/content/books
```
