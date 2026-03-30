import type { Metadata } from "next";
import { getAllContent } from '@/lib/content';
import PageHeader from "@/partials/PageHeader";
import type { BookMeta } from '@/lib/types';
export const metadata: Metadata = {
  title: "Bookshelf",
};

export default async function Page() {
  const books = getAllContent('books');
  const booksByYear = books.reduce<Record<string, typeof books>>((acc, book) => {
    const meta = book.meta as BookMeta;
    const year = meta.yearRead ?? new Date().getFullYear();
    const yearKey = Number.isFinite(year) ? String(year) : 'Unknown';

    if (!acc[yearKey]) {
      acc[yearKey] = [];
    }

    acc[yearKey].push(book);
    return acc;
  }, {});

  const years = Object.keys(booksByYear).sort((a, b) => {
    if (a === 'Unknown') return 1;
    if (b === 'Unknown') return -1;
    return Number(b) - Number(a);
  });

  const OPEN_LIBRARY_COVERS_URL = "https://covers.openlibrary.org/b/isbn";
  
  async function hasOpenLibraryCover(isbn?: string): Promise<boolean> {
    const url = `${OPEN_LIBRARY_COVERS_URL}/${isbn}-L.jpg?default=false`;
    const res = await fetch(url, { method: "HEAD" });
    return res.ok; // true for 200, false for 404
  }

  const BookItem = async ({ book }: { book: typeof books[number] }) => {
    const meta = book.meta as BookMeta;
    return (
      <>
        {await hasOpenLibraryCover(meta.isbn) ? (
          <figure className="c-book-list__cover">
            <img src={`${OPEN_LIBRARY_COVERS_URL}/${meta.isbn}-L.jpg`} loading="lazy" alt={`${meta.title} - ${meta.author}`} title={`${meta.title} - ${meta.author}`} />
          </figure>
        ) : (
          <div className="c-book-list__cover is-text-only">
            <h3>{meta.title}</h3>
            <p>{meta.author}</p>
            <p>{meta.yearPublished}</p>
          </div>
        )}
      </>
    );
  };

  return (
    <article className="c-page c-page--single c-page--bookshelf u-grid">
      <PageHeader
        title="Bookshelf"
        summary="A list of books I've read."
      />

      <div className="c-page__body">
        {years.map((year) => (
          <section key={year}>
            <h2 className="c-section__title">{year} ({booksByYear[year].length})</h2>

            <ul className="c-book-list">
              {booksByYear[year].map((book) => {
                return (
                  <li key={book.slug}>
                    <BookItem key={book.slug} book={book} />
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section>
          <h2 className="c-section__title">Some Stats</h2>

          <ul className="c-books-stats">
            <li>
              <p className="c-books-stats__label">Total books read</p>
              <p className="c-books-stats__value">{books.length}</p>
            </li>
            <li>
              <p className="c-books-stats__label">Total pages read</p>
              <p className="c-books-stats__value">{books.reduce((acc, book) => acc + ((book.meta as BookMeta).pageCount ?? 0), 0)}</p>
            </li>
            <li>
              <p className="c-books-stats__label">Time spent reading</p>
              <p className="c-books-stats__value">1.852 hours</p>
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}