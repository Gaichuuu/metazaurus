/**
 * Layout constants for component sizing and spacing
 */

/** Padding for PDF viewer container (16px each side) */
export const PDF_CONTAINER_PADDING = 32;

/** Card grid configuration */
export const CARD_GRID = {
  /** Number of columns in the card grid */
  COLUMNS: 4,
  /** Gap between cards in pixels */
  GAP: 12,
  /** Padding around the grid in pixels */
  PADDING: 16,
  /** Card aspect ratio (width / height) - standard TCG 63:88 */
  ASPECT_RATIO: 63 / 88,
} as const;

/** Standard card dimensions for react-window virtualization */
export const CARD_DIMENSIONS = {
  /** Minimum card width in pixels */
  MIN_WIDTH: 120,
  /** Maximum card width in pixels */
  MAX_WIDTH: 200,
} as const;
