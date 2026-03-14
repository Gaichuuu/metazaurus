export const VALID_CATEGORIES = [
  "characters",
  "locations",
  "world",
  "codex",
  "magazine",
  "manga",
  "book",
  "fanfic",
] as const;

export type CategoryType = (typeof VALID_CATEGORIES)[number];

export function isValidCategory(value: string): value is CategoryType {
  return (VALID_CATEGORIES as readonly string[]).includes(value);
}

export interface WikiEntry {
  id: string;
  slug: string;
  name: string;
  category: CategoryType;
  summary?: string;
  rawMarkdown: string;
  pdfUrl?: string;
  metadata: Record<string, string>;
}

export interface ColumnConfig {
  key: string;
  header: string;
  width: string;
}

export interface CategoryConfig {
  type: CategoryType;
  label: string;
  listColumns: ColumnConfig[];
}
