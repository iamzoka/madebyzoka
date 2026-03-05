import { getAllContent } from '@/lib/content';

export default async function Page() {
  const articles = getAllContent('articles');

  return (
    <div className="c-page c-page--articles-list">
      <header className="c-page__header">
        <div className="u-container">
          <h1 className='c-page__title'>Long<em>-ish</em> form Articles</h1>

          <div className="c-page__summary">
            <p>I write down some things that I&apos;m thinking about, sometimes about software, sometimes about life. It&apos;s mostly for self-documenting purposes and I hope you find it interesting as well.</p>
          </div>
        </div>
      </header>

      <div className="c-page__body">        
        <div className="u-container">
          <ul className="c-headlines">
            {articles.map((article) => (
              <li key={article.slug}>
                <h3><a href={`/articles/${article.slug}`} title={article.meta.title}>{article.meta.title}</a></h3>
                <p className="c-date-line"><small>{new Date(article.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small></p>
                <p>{article.meta.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}