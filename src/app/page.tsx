import Image from "next/image";
import { getAllContent } from "@/lib/content";
import { summarizeText, transformDate } from "@/lib/utils";
import EntryContent from "@/components/EntryContent";

export default async function Page() {
  const articles = getAllContent('articles');
  const notes = getAllContent('notes');
  
  return (
    <>
      <section className="c-section c-section--intro">
        <div className="u-container u-grid">
          <Image className="c-section__image u-rounded" width={500} height={500} src="/images/profile-image-lg-bw.png" alt="Zoran Zlokapa profile image" />

          <div className="c-section__content">
            <h1>Hey there 👋 I am Zoran, builder of software, explorer of interfaces & code composer.</h1>
            <p>I&apos;m a proud husband and father, eater of books and a passionate motorcyclist.</p>
            <p>Oh yeah, I also run a <a href="https://refreshd.net" title="Refresh'd">small development agency</a>.</p>
          </div>
        </div>
      </section>

      <section className="c-section c-section--articles">
        <header className="c-section__header">
          <div className="u-container">
            <h2>Articles &amp; Thoughts</h2>
            <p>I write down some things that I&apos;m thinking about, sometimes about software, sometimes about life. 
              It&apos;s mostly for self-documenting purposes but I think you might find it interesting as well.</p>
          </div>
        </header>

        <div className="u-container u-grid">
          <ul className="c-section-articles-list c-headlines">
            {articles.map((article) => (
              <li key={article.slug}>
                <h3><a href={`/articles/${article.slug}`} title={article.meta.title}>{article.meta.title}</a></h3>
                <p className="c-date-line"><small>{transformDate(article.meta.date)}</small></p>
                <p>{article.meta.summary}</p>
              </li>
            ))}
          </ul>

          <ul className="c-section-notes-list c-headlines">
            {notes.map((note) => (
              <li key={note.slug}>
                <h6>
                  <a href={`/notes/${note.slug}`} title={transformDate(note.meta.date)}>
                    {transformDate(note.meta.date)}
                  </a>
                </h6>
                <EntryContent contentString={summarizeText(note.meta.summary)} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}