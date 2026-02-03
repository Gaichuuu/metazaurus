import { useState, useMemo, useEffect, useRef } from "react";
import { Grid, type CellComponentProps } from "react-window";
import { cardSets, getCardImageUrl } from "../config/cardSets";
import type { CardSet, Card } from "../config/cardSets";
import { CARD_GRID } from "../constants";

interface SelectedCard {
  card: Card;
  cardSet: CardSet;
}

interface CardGridViewProps {
  cardSet: CardSet;
  onCardClick: (card: Card) => void;
}

/** Props passed via cellProps to the Grid */
interface CardCellData {
  cards: Card[];
  cardSet: CardSet;
  columnCount: number;
  onCardClick: (card: Card) => void;
}

function CardCell({
  columnIndex,
  rowIndex,
  style,
  ...cellData
}: CellComponentProps<CardCellData>) {
  const { cards, cardSet, columnCount, onCardClick } = cellData;
  const index = rowIndex * columnCount + columnIndex;

  if (index >= cards.length) {
    return <div style={style} />;
  }

  const card = cards[index];
  return (
    <div style={style} className="p-1">
      <button
        type="button"
        className="card-slot card-slot-interactive w-full h-full"
        onClick={() => onCardClick(card)}
      >
        <img
          src={getCardImageUrl(cardSet, card)}
          alt={`${card.number}. ${card.name}${card.variant ? ` (${card.variant})` : ""}`}
          className="card-image"
          loading="lazy"
        />
      </button>
    </div>
  );
}

function CardGridView({ cardSet, onCardClick }: CardGridViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      setDimensions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  // Responsive column count: 2 on mobile (<640px), 4 on desktop
  const columnCount = dimensions.width < 640 ? 2 : CARD_GRID.COLUMNS;

  const gridConfig = useMemo(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return null;

    // Use percentage-based column width - react-window v2 supports this
    const columnWidthPercent = `${100 / columnCount}%`;

    // Calculate row height based on card aspect ratio
    // Approximate column width in pixels for row height calculation
    const columnWidthPx = width / columnCount;
    const cardWidth = columnWidthPx - CARD_GRID.GAP;
    const rowHeight = cardWidth / CARD_GRID.ASPECT_RATIO + CARD_GRID.GAP;

    const rowCount = Math.ceil(cardSet.cards.length / columnCount);

    return {
      columnWidth: columnWidthPercent,
      rowHeight,
      rowCount,
    };
  }, [dimensions, cardSet.cards.length, columnCount]);

  const cellProps: CardCellData = useMemo(
    () => ({
      cards: cardSet.cards,
      cardSet,
      columnCount,
      onCardClick,
    }),
    [cardSet, columnCount, onCardClick]
  );

  // Use lighter background for Sample set (black card borders blend with dark bg)
  const bgClass =
    cardSet.id === "sample" ? "cards-binder-bg-light" : "cards-binder-bg";

  return (
    <div className={`${bgClass} h-full w-full p-2`}>
      <div ref={containerRef} className="h-full w-full overflow-x-hidden">
        {gridConfig && dimensions.width > 0 && (
          <Grid
            cellComponent={CardCell}
            cellProps={cellProps}
            columnCount={columnCount}
            columnWidth={gridConfig.columnWidth}
            rowCount={gridConfig.rowCount}
            rowHeight={gridConfig.rowHeight}
            style={{ height: dimensions.height }}
          />
        )}
      </div>
    </div>
  );
}

interface CardModalProps {
  selectedCard: SelectedCard;
  onClose: () => void;
}

function CardModal({ selectedCard, onClose }: CardModalProps) {
  const { card, cardSet } = selectedCard;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-md w-full">
        <img
          src={getCardImageUrl(cardSet, card)}
          alt={`${card.number}. ${card.name}${card.variant ? ` (${card.variant})` : ""}`}
          className="w-full h-auto rounded-lg shadow-2xl"
        />
        <div className="mt-3 text-center text-white font-mono">
          <div className="text-lg font-bold">{card.name}</div>
          <div className="text-sm opacity-70">
            #{card.number} {card.variant ? `(${card.variant})` : ""} -{" "}
            {cardSet.name}
          </div>
        </div>
      </div>
    </div>
  );
}

const isMobile = () => window.matchMedia("(pointer: coarse)").matches;

export function CardsPage() {
  const [selectedSetId, setSelectedSetId] = useState<string>(
    cardSets[0]?.id ?? ""
  );
  const [listOpen, setListOpen] = useState(isMobile);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  const selectedSet = useMemo(() => {
    return cardSets.find((set) => set.id === selectedSetId) ?? cardSets[0];
  }, [selectedSetId]);

  const handleSetSelect = (setId: string) => {
    setSelectedSetId(setId);
    setListOpen(false);
  };

  const handleCardClick = (card: Card) => {
    if (selectedSet) {
      setSelectedCard({ card, cardSet: selectedSet });
    }
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
        <div
          className="md:hidden absolute inset-0 bg-black/50 z-30"
          onClick={() => setListOpen(false)}
        />
      )}

      <div
        className={`
          flex-shrink-0 flex flex-col overflow-hidden bg-[#9ead6f]
          absolute md:relative inset-y-0 left-0 z-40
          w-64 md:w-1/3 md:max-w-xs
          transform transition-transform duration-200 ease-in-out
          ${listOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="zaurus-list-header flex-shrink-0 flex">
          <span className="md:hidden w-full">Cards</span>
          <span className="flex-1 hidden md:inline">Set</span>
          <span className="w-16 text-center hidden md:inline">Cards</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cardSets.map((set) => (
            <button
              key={set.id}
              onClick={() => handleSetSelect(set.id)}
              className={`zaurus-list-row w-full text-left ${
                selectedSet?.id === set.id ? "selected" : ""
              }`}
            >
              <span className="flex-1 truncate">{set.name}</span>
              <span className="w-16 text-center">{set.totalCards}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="zaurus-panel-divider hidden md:block" />

      <div className="flex-1 overflow-hidden">
        {selectedSet ? (
          <CardGridView cardSet={selectedSet} onCardClick={handleCardClick} />
        ) : (
          <div className="zaurus-empty p-4">Select a card set to view</div>
        )}
      </div>

      {selectedCard && (
        <CardModal
          selectedCard={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
