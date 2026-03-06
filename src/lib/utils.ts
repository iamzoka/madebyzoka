export const transformDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });


export function summarizeText(content: string, maxLength = 160): string {
  if (content.length <= maxLength) {
    return content;
  }

  return content.slice(0, maxLength).trimEnd() + "…";
}
