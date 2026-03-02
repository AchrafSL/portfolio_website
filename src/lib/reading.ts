import readingTime from 'reading-time';

export function calculateReadingTimeFromHtml(html: string): number {
  if (!html) return 1;
  // Convert HTML to text by stripping tags before calculating reading time
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .trim();
  const stats = readingTime(text);
  return Math.max(1, Math.ceil(stats.minutes));
}

export function calculateReadingTimeFromMarkdown(markdown: string): number {
  if (!markdown) return 1;
  const stats = readingTime(markdown);
  return Math.max(1, Math.ceil(stats.minutes));
}
