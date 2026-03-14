import fs from "fs";
import path from "path";
import { extractTitle, deriveSlug } from "../src/utils/slug";

const BASE_URL = "https://metazaurus.com";

const categories = [
  "characters",
  "locations",
  "world",
  "codex",
  "book",
  "fanfic",
  "magazine",
  "manga",
];

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSitemap(): string {
  const urls: Array<{ loc: string; priority: string; changefreq: string }> = [];

  urls.push({ loc: BASE_URL, priority: "1.0", changefreq: "weekly" });

  urls.push({ loc: `${BASE_URL}/cards`, priority: "0.8", changefreq: "weekly" });

  for (const category of categories) {
    urls.push({
      loc: `${BASE_URL}/${category}`,
      priority: "0.7",
      changefreq: "weekly",
    });
  }

  const dataDir = path.join(process.cwd(), "data");
  for (const category of categories) {
    const categoryDir = path.join(dataDir, category);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(categoryDir, file), "utf-8");
      const title = extractTitle(content, file);
      const slug = deriveSlug(title, file);
      urls.push({
        loc: `${BASE_URL}/${category}/${slug}`,
        priority: "0.5",
        changefreq: "monthly",
      });
    }
  }

  const pdfSlugs = [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
    "Chapter 6",
  ];
  for (const category of ["magazine", "manga"]) {
    for (const slug of pdfSlugs) {
      urls.push({
        loc: `${BASE_URL}/${category}/${encodeURIComponent(slug)}`,
        priority: "0.5",
        changefreq: "monthly",
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return xml;
}

const sitemap = generateSitemap();
const outputPath = path.join(process.cwd(), "sitemap.xml");
fs.writeFileSync(outputPath, sitemap, "utf-8");

console.log(`Sitemap generated at ${outputPath}`);
console.log(`Total URLs: ${(sitemap.match(/<url>/g) || []).length}`);
