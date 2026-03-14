import type { CategoryConfig } from "../types/wiki";

export const CATEGORIES: CategoryConfig[] = [
  {
    type: "characters",
    label: "Characters",
    listColumns: [{ key: "name", header: "Name", width: "w-full" }],
  },
  {
    type: "locations",
    label: "Locations",
    listColumns: [{ key: "name", header: "Location", width: "w-full" }],
  },
  {
    type: "world",
    label: "World",
    listColumns: [{ key: "name", header: "Title", width: "w-full" }],
  },
  {
    type: "codex",
    label: "Codex",
    listColumns: [{ key: "name", header: "Title", width: "w-full" }],
  },
  {
    type: "magazine",
    label: "Magazine",
    listColumns: [{ key: "name", header: "Title", width: "w-full" }],
  },
  {
    type: "manga",
    label: "Manga",
    listColumns: [{ key: "name", header: "Title", width: "w-full" }],
  },
  {
    type: "book",
    label: "Book",
    listColumns: [{ key: "name", header: "Title", width: "w-full" }],
  },
  {
    type: "fanfic",
    label: "Fanfic",
    listColumns: [{ key: "name", header: "Title", width: "w-full" }],
  },
];

export function getCategoryConfig(type: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.type === type);
}
