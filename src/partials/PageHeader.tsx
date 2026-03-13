export default function PageHeader({ title, date, summary }: { title: string; date?: string; summary?: string }) {
  return (
    <header className="c-page__header">
      <h1 className="c-page__title">{title}</h1>

      {date && (
        <p className="c-page__date">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}

      {summary && (
        <div className="c-page__summary">
          <p>{summary}</p>
        </div>
      )}
    </header>
  );
}