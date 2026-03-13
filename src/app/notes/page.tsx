import type { Metadata } from "next";
import { getAllContent } from '@/lib/content';
import { transformDate } from '@/lib/utils';
import EntryContent from "@/components/EntryContent";
import PageHeader from "@/partials/PageHeader";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function Page() {
  const notes = getAllContent('notes');

  return (
    <article className="c-page c-page--single c-page--notes-list u-grid">
      <PageHeader
        title="Short notes"
        summary="Quick thoughts, observations, and snippets that could someday become a full article, but are worth sharing in the meantime."
      />

      <div className="c-page__body">
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
    </article>
  );
}