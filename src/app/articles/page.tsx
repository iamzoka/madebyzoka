import type { Metadata } from "next";
import { getAllContent } from '@/lib/content';
import PageHeader from "@/partials/PageHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Articles",
};

export default async function Page() {
  const articles = getAllContent('articles');

  return (
    <article className="c-page c-page--single c-page--articles-list u-grid">
      <PageHeader
        title="Long-ish form Articles"
        summary="I write down some things that I'm thinking about, sometimes about software, sometimes about life. It's mostly for self-documenting purposes and I hope you find it interesting as well."
      />

      <div className="c-page__body">
        <ul className="c-headlines">
          {articles.map((article) => (
            <li key={article.slug}>
              <h3>
                <Link
                  href={`/articles/${article.slug}`}
                  title={article.meta.title}
                >
                  {article.meta.title}
                </Link>
              </h3>
              <p className="c-date-line">
                <small>
                  {new Date(article.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </small>
              </p>

              <p>{article.meta.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}