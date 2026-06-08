import type { Metadata } from "next"
import BookCover from '@/components/BookCover'
import { getAllContent } from '@/lib/content'
import PageHeader from "@/partials/PageHeader"
import type { BookMeta } from '@/lib/types'
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
                const meta = book.meta as BookMeta
                return (
                  <li key={book.slug}>
                    <BookCover
                      isbn={meta.isbn}
                      title={meta.title}
                      author={meta.author}
                      yearPublished={meta.yearPublished}
                    />
                  </li>
                )
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