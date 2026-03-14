import fs from "fs";
import path from "path";
import { extractTitle, deriveSlug } from "../src/utils/slug";

const categories = ["characters", "locations", "world", "codex", "book", "fanfic"];

const categoryLabels: Record<string, string> = {
  characters: "Characters",
  locations: "Locations",
  world: "World",
  codex: "Codex",
  book: "Book",
  fanfic: "Fanfic",
  magazine: "Magazine",
  manga: "Manga",
  cards: "Cards",
};

const pdfSlugs = ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6"];

interface RouteMeta {
  title: string;
  description: string;
}

function loadDescriptions(): Record<string, string> {
  const descPath = path.join(process.cwd(), "data", "meta-descriptions.json");
  if (!fs.existsSync(descPath)) return {};
  return JSON.parse(fs.readFileSync(descPath, "utf-8"));
}

function generateMeta(): Record<string, RouteMeta> {
  const meta: Record<string, RouteMeta> = {};
  const dataDir = path.join(process.cwd(), "data");
  const descriptions = loadDescriptions();

  function desc(route: string, fallback: string): string {
    return descriptions[route] || fallback;
  }

  // Static pages
  meta["/"] = { title: "MetaZaurus", description: desc("/", "PDA reader for MetaZoo: Cryptid Nation lore") };
  meta["/cards"] = {
    title: "Cards — MetaZaurus",
    description: desc("/cards", "Browse MetaZoo: Cryptid Nation card sets"),
  };

  // Category index pages
  for (const [cat, label] of Object.entries(categoryLabels)) {
    const route = `/${cat}`;
    meta[route] = {
      title: `${label} — MetaZaurus`,
      description: desc(route, `Browse MetaZoo ${label.toLowerCase()}`),
    };
  }

  // Markdown entry pages
  for (const category of categories) {
    const categoryDir = path.join(dataDir, category);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(categoryDir, file), "utf-8");
      const title = extractTitle(content, file);
      const slug = deriveSlug(title, file);
      const label = categoryLabels[category] || category;
      const route = `/${category}/${slug}`;

      meta[route] = {
        title: `${title} — ${label} — MetaZaurus`,
        description: desc(route, `${title} in MetaZaurus ${label}`),
      };
    }
  }

  // PDF pages (magazine/manga)
  for (const category of ["magazine", "manga"]) {
    const label = categoryLabels[category];
    for (const slug of pdfSlugs) {
      const route = `/${category}/${slug}`;
      meta[route] = {
        title: `${slug} — ${label} — MetaZaurus`,
        description: desc(route, `Read MetaZoo ${label} ${slug}`),
      };
    }
  }

  return meta;
}

const meta = generateMeta();
const outputPath = path.join(process.cwd(), "dist", "meta.json");
fs.writeFileSync(outputPath, JSON.stringify(meta, null, 2), "utf-8");

console.log(`Meta manifest generated at ${outputPath}`);
console.log(`Total routes: ${Object.keys(meta).length}`);
