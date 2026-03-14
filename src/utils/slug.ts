/**
 * Converts a numbered title like "6. Crossing the Crosswick" to a URL slug like "6-crossing-the-crosswick".
 * Returns null for non-numbered titles.
 */
export function titleToSlug(title: string): string | null {
  const match = title.match(/^(\d+)\.\s+(.+)$/);
  if (!match) return null;
  const num = match[1];
  const name = match[2]
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${num}-${name}`;
}

/**
 * Extracts the H1 title from markdown content, falling back to a formatted filename.
 */
export function extractTitle(content: string, filename: string): string {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();
  return filename
    .replace(/\.md$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Derives a URL slug from a title and filename. Uses titleToSlug if the title
 * has a numbered format, otherwise falls back to the filename without extension.
 */
export function deriveSlug(title: string, filename: string): string {
  return titleToSlug(title) || filename.replace(/\.md$/, "");
}
