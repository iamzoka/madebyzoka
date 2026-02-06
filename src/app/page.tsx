import { getAllContent } from "@/lib/content";

export default function Home() {
  const articles = getAllContent("articles");

  return (
    <main>
      <h1>Articles</h1>
      <ul>
        {articles.map((a) => (
          <li key={a.slug}>
            {a.meta.title} – {a.meta.date}
          </li>
        ))}
      </ul>
    </main>
  );
}