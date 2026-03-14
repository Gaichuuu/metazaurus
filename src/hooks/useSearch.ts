import { useMemo, useState } from "react";
import type { WikiEntry } from "../types/wiki";
import { getAllEntries } from "./useWikiData";
import { getSecretConfig, isFileUnlocked } from "../config/secretFiles";

export interface SearchResult {
  entry: WikiEntry;
  snippet: string;
  matchField: "name" | "content";
}

const MAX_RESULTS = 40;
const MIN_QUERY_LENGTH = 1;
const SNIPPET_RADIUS = 80;

function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\|/g, " ")
    .replace(/[-]{3,}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSnippet(rawMarkdown: string, query: string): string {
  const cleaned = stripMarkdown(rawMarkdown);
  const lowerCleaned = cleaned.toLowerCase();
  const idx = lowerCleaned.indexOf(query.toLowerCase());
  if (idx === -1) return "";

  const start = Math.max(0, idx - SNIPPET_RADIUS);
  const end = Math.min(cleaned.length, idx + query.length + SNIPPET_RADIUS);
  let snippet = cleaned.slice(start, end);
  if (start > 0) snippet = "..." + snippet;
  if (end < cleaned.length) snippet = snippet + "...";
  return snippet;
}

function buildExactMatchPattern(query: string): RegExp {
  return new RegExp(`\\b${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
}

function isLocked(entry: WikiEntry): boolean {
  const config = getSecretConfig(entry.category, entry.slug);
  if (!config?.locked) return false;
  return !isFileUnlocked(entry.category, entry.slug);
}

export function useSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo<SearchResult[]>(() => {
    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) return [];

    const lowerQuery = trimmed.toLowerCase();
    const entries = getAllEntries();
    const exactPattern = buildExactMatchPattern(trimmed);
    // Three tiers: exact word-boundary matches, partial name matches, content-only matches
    const exactMatches: SearchResult[] = [];
    const nameMatches: SearchResult[] = [];
    const contentMatches: SearchResult[] = [];

    for (const entry of entries) {
      const locked = isLocked(entry);
      const nameMatch = entry.name.toLowerCase().includes(lowerQuery);
      // Skip content matching for locked files to avoid leaking classified content
      const contentMatch =
        !locked &&
        entry.rawMarkdown.length > 0 &&
        entry.rawMarkdown.toLowerCase().includes(lowerQuery);

      if (!nameMatch && !contentMatch) continue;

      let snippet = "";
      if (locked) {
        snippet = "[CLASSIFIED]";
      } else if (contentMatch) {
        snippet = extractSnippet(entry.rawMarkdown, trimmed);
      }

      const result: SearchResult = {
        entry,
        snippet,
        matchField: nameMatch ? "name" : "content",
      };

      const hasExactName = nameMatch && exactPattern.test(entry.name);
      const hasExactContent = contentMatch && exactPattern.test(entry.rawMarkdown);

      if (hasExactName) {
        exactMatches.push(result);
      } else if (nameMatch || hasExactContent) {
        nameMatches.push(result);
      } else {
        contentMatches.push(result);
      }
    }

    return [...exactMatches, ...nameMatches, ...contentMatches].slice(0, MAX_RESULTS);
  }, [query]);

  return { query, setQuery, results };
}
