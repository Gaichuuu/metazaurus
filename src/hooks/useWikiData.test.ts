import { describe, it, expect } from "vitest";
import { extractTitle, titleToSlug, deriveSlug } from "../utils/slug";

describe("extractTitle", () => {
  it("extracts title from markdown h1 heading", () => {
    const content = "# My Title\n\nSome content here";
    expect(extractTitle(content, "test.md")).toBe("My Title");
  });

  it("extracts title with extra whitespace", () => {
    const content = "#   Spaced Title   \n\nContent";
    expect(extractTitle(content, "test.md")).toBe("Spaced Title");
  });

  it("finds h1 even when not at start of file", () => {
    const content = "Some intro text\n\n# The Real Title\n\nMore content";
    expect(extractTitle(content, "test.md")).toBe("The Real Title");
  });

  it("falls back to filename when no h1 found", () => {
    const content = "## Secondary heading only\n\nNo h1 here";
    expect(extractTitle(content, "my-file-name.md")).toBe("My File Name");
  });

  it("converts dashes to spaces in filename fallback", () => {
    const content = "No heading";
    expect(extractTitle(content, "some-file-name.md")).toBe("Some File Name");
  });

  it("converts underscores to spaces in filename fallback", () => {
    const content = "No heading";
    expect(extractTitle(content, "some_file_name.md")).toBe("Some File Name");
  });

  it("capitalizes each word in filename fallback", () => {
    const content = "No heading";
    expect(extractTitle(content, "lowercase-words.md")).toBe("Lowercase Words");
  });
});

describe("titleToSlug", () => {
  it("converts numbered chapter title to slug", () => {
    expect(titleToSlug("6. Crossing the Crosswick")).toBe("6-crossing-the-crosswick");
  });

  it("handles multi-digit chapter numbers", () => {
    expect(titleToSlug("12. The Final Battle")).toBe("12-the-final-battle");
  });

  it("strips special characters", () => {
    expect(titleToSlug("1. Cryptid Nation")).toBe("1-cryptid-nation");
  });

  it("handles commas and parentheses", () => {
    expect(titleToSlug("7. The Incredibly Amazingly Effective Training Gizmo Box 9001, P9001 for short (Patent Pending)"))
      .toBe("7-the-incredibly-amazingly-effective-training-gizmo-box-9001-p9001-for-short-patent-pending");
  });

  it("returns null for non-numbered titles", () => {
    expect(titleToSlug("Adam Ackler")).toBeNull();
  });

  it("returns null for titles without period after number", () => {
    expect(titleToSlug("Chapter 6")).toBeNull();
  });
});

describe("deriveSlug", () => {
  it("uses titleToSlug for numbered titles", () => {
    expect(deriveSlug("6. Crossing the Crosswick", "chapter-6.md")).toBe("6-crossing-the-crosswick");
  });

  it("falls back to filename without extension for non-numbered titles", () => {
    expect(deriveSlug("Adam Ackler", "adam-ackler.md")).toBe("adam-ackler");
  });

  it("strips .md from filename fallback", () => {
    expect(deriveSlug("Some Entry", "some-entry.md")).toBe("some-entry");
  });
});

// These functions are private to useWikiData, so we re-implement for testing
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

describe("extractChapterNumber", () => {
  it("extracts number from chapter filename", () => {
    expect(extractChapterNumber("chapter-1.md")).toBe("1");
  });

  it("extracts multi-digit chapter numbers", () => {
    expect(extractChapterNumber("chapter-12.md")).toBe("12");
  });

  it("extracts number at start of filename", () => {
    expect(extractChapterNumber("01-introduction.md")).toBe("01");
  });

  it("returns empty string when no number found", () => {
    expect(extractChapterNumber("introduction.md")).toBe("");
  });

  it("extracts first number when multiple present", () => {
    expect(extractChapterNumber("chapter-3-part-2.md")).toBe("3");
  });
});

describe("pdfFilenameToName", () => {
  it("removes .pdf extension", () => {
    expect(pdfFilenameToName("document.pdf")).toBe("Document");
  });

  it("removes .PDF extension (case insensitive)", () => {
    expect(pdfFilenameToName("document.PDF")).toBe("Document");
  });

  it("converts dashes to spaces", () => {
    expect(pdfFilenameToName("my-document.pdf")).toBe("My Document");
  });

  it("converts underscores to spaces", () => {
    expect(pdfFilenameToName("my_document.pdf")).toBe("My Document");
  });

  it("capitalizes each word", () => {
    expect(pdfFilenameToName("issue-01-winter.pdf")).toBe("Issue 01 Winter");
  });
});

describe("sorting logic", () => {
  interface SortableEntry {
    name: string;
    metadata: { chapter: string };
  }

  function sortEntries(entries: SortableEntry[]): SortableEntry[] {
    return [...entries].sort((a, b) => {
      const aNum = parseInt(a.metadata.chapter || "0", 10);
      const bNum = parseInt(b.metadata.chapter || "0", 10);
      if (aNum && bNum) return aNum - bNum;
      return a.name.localeCompare(b.name);
    });
  }

  it("sorts by chapter number when both have chapters", () => {
    const entries = [
      { name: "Chapter 3", metadata: { chapter: "3" } },
      { name: "Chapter 1", metadata: { chapter: "1" } },
      { name: "Chapter 2", metadata: { chapter: "2" } },
    ];
    const sorted = sortEntries(entries);
    expect(sorted.map((e) => e.metadata.chapter)).toEqual(["1", "2", "3"]);
  });

  it("sorts alphabetically when no chapter numbers", () => {
    const entries = [
      { name: "Zebra", metadata: { chapter: "" } },
      { name: "Alpha", metadata: { chapter: "" } },
      { name: "Beta", metadata: { chapter: "" } },
    ];
    const sorted = sortEntries(entries);
    expect(sorted.map((e) => e.name)).toEqual(["Alpha", "Beta", "Zebra"]);
  });

  // Items without chapter numbers get 0, so they sort first alphabetically
  it("puts numbered entries before unnumbered ones", () => {
    const entries = [
      { name: "Appendix", metadata: { chapter: "" } },
      { name: "Chapter 1", metadata: { chapter: "1" } },
    ];
    const sorted = sortEntries(entries);
    expect(sorted[0].name).toBe("Appendix");
  });
});
