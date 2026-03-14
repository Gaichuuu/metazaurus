import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategoryList } from "../hooks/useWikiData";
import { MarkdownContent } from "../components/content/MarkdownContent";
import { PdfViewer } from "../components/content/PdfViewer";
import { LockedContent } from "../components/content/LockedContent";
import { getCategoryConfig } from "../config/categories";
import { getSecretConfig, isFileUnlocked, unlockFile } from "../config/secretFiles";
import { isValidCategory } from "../types/wiki";
import type { CategoryType, WikiEntry } from "../types/wiki";
import { isTouchDevice } from "../utils/isTouchDevice";

interface EntryContentProps {
  entry: WikiEntry;
  categoryType: CategoryType;
  unlockedFiles: Set<string>;
  onUnlock: (key: string) => void;
}

function EntryContent({
  entry,
  categoryType,
  unlockedFiles,
  onUnlock,
}: EntryContentProps) {
  const secretConfig = getSecretConfig(categoryType, entry.slug);
  const fileKey = `${categoryType}/${entry.slug}`;

  const isLocked =
    secretConfig?.locked &&
    !isFileUnlocked(categoryType, entry.slug) &&
    !unlockedFiles.has(fileKey);

  const handleUnlockComplete = () => {
    unlockFile(categoryType, entry.slug);
    onUnlock(fileKey);
  };

  const contentClassName = categoryType === "world" ? "world-content" : undefined;

  const content = (
    <MarkdownContent content={entry.rawMarkdown} className={contentClassName} />
  );

  if (isLocked) {
    return (
      <div className="h-full overflow-y-auto p-4">
        <LockedContent
          hint={secretConfig?.locked?.hint}
          correctPassword={secretConfig?.locked?.password ?? ""}
          onUnlockComplete={handleUnlockComplete}
        >
          {content}
        </LockedContent>
      </div>
    );
  }

  return <div className="h-full overflow-y-auto p-4">{content}</div>;
}

export function CategoryPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const categoryType: CategoryType = isValidCategory(category ?? "")
    ? category as CategoryType
    : "characters";

  return <CategoryPageContent key={categoryType} categoryType={categoryType} slug={slug} />;
}

interface CategoryPageContentProps {
  categoryType: CategoryType;
  slug: string | undefined;
}

function CategoryPageContent({ categoryType, slug }: CategoryPageContentProps) {
  const navigate = useNavigate();
  const { entries } = useCategoryList(categoryType);
  const [listOpen, setListOpen] = useState(isTouchDevice);
  const [unlockedFiles, setUnlockedFiles] = useState<Set<string>>(new Set());
  const config = getCategoryConfig(categoryType);

  useEffect(() => {
    if (!slug && entries.length > 0) {
      navigate(`/${categoryType}/${entries[0].slug}`, { replace: true });
    }
  }, [slug, entries, categoryType, navigate]);

  const selectedEntry = useMemo(() => {
    if (entries.length === 0) return null;
    if (slug) {
      const found = entries.find((e) => e.slug === slug);
      if (found) return found;
    }
    return null;
  }, [entries, slug]);

  useEffect(() => {
    if (selectedEntry) {
      document.title = `${selectedEntry.name} — MetaZaurus`;
    } else if (config) {
      document.title = `${config.label} — MetaZaurus`;
    }
    return () => { document.title = "MetaZaurus"; };
  }, [selectedEntry, config]);

  if (entries.length === 0) {
    return <div className="zaurus-empty">No entries found for {categoryType}</div>;
  }

  const handleEntrySelect = (entrySlug: string) => {
    navigate(`/${categoryType}/${entrySlug}`);
    setListOpen(false);
  };

  return (
    <div className="flex h-full relative">
      <button
        type="button"
        onClick={() => setListOpen(!listOpen)}
        className="md:hidden absolute bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-amber-600 text-white shadow-lg flex items-center justify-center"
        aria-label={listOpen ? "Close list" : "Open list"}
      >
        {listOpen ? "✕" : "☰"}
      </button>

      {listOpen && (
        <button
          type="button"
          className="md:hidden absolute inset-0 bg-black/50 z-30"
          onClick={() => setListOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <div
        className={`
          flex-shrink-0 flex flex-col overflow-hidden bg-zaurus-lcd-bg
          absolute md:relative inset-y-0 left-0 z-40
          w-64 md:w-1/3 md:max-w-xs
          transform transition-transform duration-200 ease-in-out
          ${listOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="zaurus-list-header flex-shrink-0 flex">
          <span className="md:hidden w-full">
            {config?.label ||
              categoryType.charAt(0).toUpperCase() + categoryType.slice(1)}
          </span>
          {config?.listColumns.map((col) => (
            <span key={col.key} className={`${col.width} hidden md:inline`}>
              {col.header}
            </span>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {entries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => handleEntrySelect(entry.slug)}
              className={`zaurus-list-row w-full text-left ${
                selectedEntry?.id === entry.id ? "selected" : ""
              }`}
            >
              {config?.listColumns.map((col) => (
                <span key={col.key} className={`${col.width} truncate`}>
                  {entry.metadata[col.key] || (col.key === "name" ? entry.name : "")}
                </span>
              ))}
            </button>
          ))}
        </div>
      </div>

      <div className="zaurus-panel-divider hidden md:block" />

      <div className="flex-1 overflow-hidden">
        {selectedEntry ? (
          selectedEntry.pdfUrl ? (
            <PdfViewer key={selectedEntry.pdfUrl} url={selectedEntry.pdfUrl} />
          ) : (
            <EntryContent
              entry={selectedEntry}
              categoryType={categoryType}
              unlockedFiles={unlockedFiles}
              onUnlock={(key) => setUnlockedFiles((prev) => new Set(prev).add(key))}
            />
          )
        ) : slug ? (
          <div className="zaurus-empty p-4">Entry not found: {slug}</div>
        ) : (
          <div className="zaurus-empty p-4">Select an entry to view details</div>
        )}
      </div>
    </div>
  );
}
