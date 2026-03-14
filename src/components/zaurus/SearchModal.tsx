import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import type { SearchResult } from "../../hooks/useSearch";
import { isTouchDevice } from "../../utils/isTouchDevice";

interface SearchModalProps {
  onClose: () => void;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query || !text) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function SearchModal({ onClose }: SearchModalProps) {
  const { query, setQuery, results } = useSearch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const selectResult = useCallback(
    (result: SearchResult) => {
      navigate(`/${result.entry.category}/${result.entry.slug}`);
      onClose();
    },
    [navigate, onClose],
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(0);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        return;
      }
      if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        const result = results[selectedIndex];
        if (result) selectResult(result);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [results, selectedIndex, selectResult, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    const container = resultsRef.current;
    if (!container) return;
    const selected = container.children[selectedIndex] as HTMLElement | undefined;
    selected?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  return (
    <div className="search-backdrop" onClick={onClose}>
      <div
        className="search-modal"
        role="dialog"
        aria-label="Search"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-title">
          <span>Search Database</span>
          <button className="search-close" onClick={onClose} aria-label="Close">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M1 1l8 8M9 1l-8 8" />
            </svg>
          </button>
        </div>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Enter search term..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          autoFocus={!isTouchDevice()}
          autoComplete="off"
        />
        <div className="search-results" ref={resultsRef}>
          {query.trim().length < 1 && (
            <div className="search-empty">Search characters, lore, secrets...</div>
          )}
          {query.trim().length >= 1 && results.length === 0 && (
            <div className="search-empty">NO RESULTS FOUND</div>
          )}
          {results.map((result, i) => (
            <div
              key={`${result.entry.category}/${result.entry.slug}`}
              className={`search-result-item${i === selectedIndex ? " selected" : ""}`}
              onClick={() => selectResult(result)}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <span className="search-result-category">{result.entry.category}</span>
              <span className="search-result-name">{result.entry.name}</span>
              {result.snippet && (
                <span className="search-result-snippet">
                  {highlightMatch(result.snippet, query.trim())}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="search-footer">
          {results.length > 0
            ? `${results.length} result${results.length === 1 ? "" : "s"} `
            : ""}
          ESC to close
        </div>
      </div>
    </div>
  );
}
