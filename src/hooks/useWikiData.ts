import type { WikiEntry, CategoryType } from "../types/wiki";
import { extractTitle, deriveSlug } from "../utils/slug";
import { getSecretConfig } from "../config/secretFiles";
import { cardSets } from "../config/cardSets";

const markdownFiles = import.meta.glob("/data/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// PDF manifest - hardcoded list of available PDFs (served from CDN)
const PDF_MANIFEST: Record<string, string[]> = {
  magazine: [
    "Chapter 1.pdf",
    "Chapter 2.pdf",
    "Chapter 3.pdf",
    "Chapter 4.pdf",
    "Chapter 5.pdf",
    "Chapter 6.pdf",
  ],
  manga: [
    "Chapter 1.pdf",
    "Chapter 2.pdf",
    "Chapter 3.pdf",
    "Chapter 4.pdf",
    "Chapter 5.pdf",
    "Chapter 6.pdf",
  ],
};

// CDN base URLs for PDF content
const PDF_CDN_BASE = {
  magazine: "https://gaichu.b-cdn.net/mz/magazine",
  manga: "https://gaichu.b-cdn.net/mz/manga",
} as const;

function extractChapterNumber(filename: string): string {
  const match = filename.match(/(\d+)/);
  return match ? match[1] : "";
}

function pdfFilenameToName(filename: string): string {
  return filename
    .replace(/\.pdf$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function loadPdfsFromFolder(folderPath: string, category: CategoryType): WikiEntry[] {
  const entries: WikiEntry[] = [];
  const cdnBase = PDF_CDN_BASE[folderPath as keyof typeof PDF_CDN_BASE];
  const filenames = PDF_MANIFEST[folderPath] || [];

  for (const filename of filenames) {
    const slug = filename.replace(/\.pdf$/i, "");
    const name = pdfFilenameToName(filename);
    const chapter = extractChapterNumber(filename);
    const pdfUrl = `${cdnBase}/${encodeURIComponent(filename)}`;

    entries.push({
      id: slug,
      slug,
      name,
      category,
      rawMarkdown: "",
      pdfUrl,
      metadata: {
        name,
        chapter,
      },
    });
  }

  return entries.sort((a, b) => {
    const aNum = parseInt(a.metadata.chapter || "0", 10);
    const bNum = parseInt(b.metadata.chapter || "0", 10);
    if (aNum && bNum) return aNum - bNum;
    return a.name.localeCompare(b.name);
  });
}

function loadMarkdownFromFolder(folderPath: string, category: CategoryType): WikiEntry[] {
  const entries: WikiEntry[] = [];

  for (const [path, content] of Object.entries(markdownFiles)) {
    if (path.startsWith(`/data/${folderPath}/`) && !path.includes(".chapters-draft")) {
      const filename = path.split("/").pop() || "";
      const name = extractTitle(content, filename);
      const slug = deriveSlug(name, filename);
      const chapter = extractChapterNumber(filename);

      entries.push({
        id: slug,
        slug,
        name,
        category,
        rawMarkdown: content,
        metadata: {
          name,
          chapter,
        },
      });
    }
  }

  return entries.sort((a, b) => {
    const aNum = parseInt(a.metadata.chapter || "0", 10);
    const bNum = parseInt(b.metadata.chapter || "0", 10);
    if (aNum && bNum) return aNum - bNum;
    return a.name.localeCompare(b.name);
  });
}

function loadCategoryData(category: CategoryType): WikiEntry[] {
  switch (category) {
    case "characters":
      return loadMarkdownFromFolder("characters", "characters");
    case "locations":
      return loadMarkdownFromFolder("locations", "locations");
    case "world":
      return loadMarkdownFromFolder("world", "world");
    case "codex":
      return loadMarkdownFromFolder("codex", "codex");
    case "book":
      return loadMarkdownFromFolder("book", "book");
    case "fanfic":
      return loadMarkdownFromFolder("fanfic", "fanfic");
    case "magazine":
      return loadPdfsFromFolder("magazine", "magazine");
    case "manga":
      return loadPdfsFromFolder("manga", "manga");
    default:
      return [];
  }
}

const dataCache: Record<CategoryType, WikiEntry[]> = {
  characters: loadCategoryData("characters"),
  locations: loadCategoryData("locations"),
  world: loadCategoryData("world"),
  codex: loadCategoryData("codex"),
  magazine: loadCategoryData("magazine"),
  manga: loadCategoryData("manga"),
  book: loadCategoryData("book"),
  fanfic: loadCategoryData("fanfic"),
};

const allEntriesCache: WikiEntry[] = Object.values(dataCache).flat();

export function getAllEntries(): WikiEntry[] {
  return allEntriesCache;
}

export interface WikiStats {
  entries: number;
  classified: number;
  cards: number;
}

const wikiStatsCache: WikiStats = (() => {
  let entries = 0;
  let classified = 0;
  for (const entry of allEntriesCache) {
    const config = getSecretConfig(entry.category, entry.slug);
    if (config?.locked) {
      classified++;
    } else {
      entries++;
    }
  }
  const cards = cardSets.reduce((sum, set) => sum + set.cards.length, 0);
  return { entries, classified, cards };
})();

export function getWikiStats(): WikiStats {
  return wikiStatsCache;
}

export function useCategoryList(category: CategoryType): {
  entries: WikiEntry[];
} {
  return { entries: dataCache[category] || [] };
}

export function useWikiEntry(
  category: CategoryType,
  slug: string,
): { entry: WikiEntry | undefined } {
  const { entries } = useCategoryList(category);
  const entry = entries.find((e) => e.slug === slug);
  return { entry };
}
