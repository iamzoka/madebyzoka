# A personal website of web designer and developer Zoran Zlokapa

For this iteration, I decided to go with Next.js because I never worked with it before and I need the experience.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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
