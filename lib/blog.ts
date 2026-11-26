/** Helpers shared by the blog list, post page, and home preview. Safe for server and client code. */

interface PostBody {
  title: string;
  excerpt: string;
  sections: { heading: string; paragraphs: string[]; items: string[] }[];
}

/** Estimated reading time in whole minutes (about 200 words per minute, at least 1). */
export function readingMinutes(post: PostBody): number {
  const text = [post.title, post.excerpt, ...post.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...s.items])].join(' ');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** "2026-11-26" -> "26 November 2026" (or the locale's long date format). */
export function formatPostDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}
