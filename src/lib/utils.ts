export const transformDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

function stripMarkup(content: string): string {
  let text = content;

  // Remove fenced code blocks ```...```
  text = text.replace(/```[\s\S]*?```/g, '');

  // Remove markdown headings, e.g. "# Title", "## Title"
  text = text.replace(/^\s{0,3}#{1,6}\s+.*$/gm, '');

  // Replace images ![alt](url) with their alt text
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, (_, alt: string) => alt || '');

  // Remove inline code `code`
  text = text.replace(/`([^`]+)`/g, '$1');

  // Strip remaining HTML tags (in case markdown has been converted)
  text = text.replace(/<[^>]+>/g, '');

  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

export function summarizeText(content: string, maxLength = 300): string {
  const plain = stripMarkup(content);

  if (plain.length <= maxLength) {
    return plain;
  }

  return plain.slice(0, maxLength).trimEnd() + '…';
}
