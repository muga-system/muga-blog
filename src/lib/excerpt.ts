const MAX_EXCERPT_LENGTH = 140;

export function toEditorialExcerpt(text: string): string {
  const clean = text.trim().replace(/\s+/g, " ");

  if (clean.length <= MAX_EXCERPT_LENGTH) {
    return clean;
  }

  const truncated = clean.slice(0, MAX_EXCERPT_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace < 60) {
    return `${truncated.trimEnd()}…`;
  }

  return `${truncated.slice(0, lastSpace).trimEnd()}…`;
}
