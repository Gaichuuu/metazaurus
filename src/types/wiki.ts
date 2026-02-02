export type CategoryType =
  | "characters"
  | "locations"
  | "world"
  | "codex"
  | "magazine"
  | "manga"
  | "book";

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
