import type { Metadata } from "next";
import { getAllContent } from '@/lib/content';
import { transformDate } from '@/lib/utils';
import EntryContent from "@/components/EntryContent";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function Page() {
  const notes = getAllContent('notes');

  return (
    <div className="c-page c-page--notes-list">
      <header className="c-page__header">
        <div className="u-container">
          <h1 className='c-page__title'>Short notes</h1>

          <div className="c-page__summary">
            <p>Quick thoughts, observations, and snippets that could someday become a full article, but are worth sharing in the meantime.</p>
          </div>
        </div>
      </header>

      <div className="u-container">
        <ul className="c-headlines">
          {notes.map((note) => (
            <li key={note.slug}>
              <h4>
                <a href={`/notes/${note.slug}`} title={transformDate(note.meta.date)}>
                  {transformDate(note.meta.date)}
                </a>
              </h4>
              <EntryContent contentString={note.content} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}