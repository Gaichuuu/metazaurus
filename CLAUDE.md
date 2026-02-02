# MetaZaurus

A wiki/reader application for MetaZoo: Cryptid Nation lore, built with a Sharp Zaurus PDA-inspired LCD aesthetic.

## Quick Facts

- **Stack**: React 19, TypeScript, Vite (rolldown), TailwindCSS
- **Build Command**: `npm run build`
- **Dev Command**: `npm run dev`
- **Lint Command**: `npm run lint`

## Key Directories

- `src/components/` - React components (content/, layout/)
- `src/components/content/` - MarkdownContent, PdfViewer, DetailView, LockedContent, CorruptedBanner
- `src/hooks/` - Custom React hooks (useWikiData)
- `src/pages/` - Page components (CategoryPage, CardsPage, HomePage)
- `src/config/` - Configuration (categories.ts, secretFiles.ts, cardSets.ts)
- `src/styles/` - CSS files (zaurus.css for LCD theme)
- `src/utils/` - Utility functions (markdownParser)
- `data/` - Content files
  - `data/book/` - Book chapters (markdown)
  - `data/characters/` - Character entries
  - `data/locations/` - Location entries
  - `data/world/` - World lore
  - `data/codex/` - Codex entries
  - `data/magazine/` - Magazine PDFs
  - `data/manga/` - Manga PDFs
- `public/images/` - Static images for use in markdown content

## Code Style

- TypeScript strict mode enabled
- Prefer `interface` over `type` (except unions/intersections)
- No `any` - use `unknown` instead
- Use early returns, avoid nested conditionals

## Markdown Rendering

The project uses react-markdown with plugins:

- `remark-gfm` - GitHub Flavored Markdown
- `rehype-raw` - HTML tag support

Supported features:

- `<br>` for line breaks
- `---` for horizontal rules (styled as gradient dividers)
- `>` for blockquotes (styled with amber border)
- Tables, strikethrough, task lists

### Content Consistency Rules

- **Ellipsis**: Use `...` (three periods), not `…` character
- **Em dash**: Use `—` with no spaces
- **Internal thoughts**: Italicized (`_thought here_`)
- **Subtle sound effects**: Italicized (`_click-clack_`)
- **Dramatic sound effects**: Bolded (`**THWACK!**`, `**BAM!**`)
- **Radio/blockquote dialogue**: Plain text, not italicized
- **Spirit voices in blockquotes**: Italicized (`> _forgive me..._`)
- **Paragraphs**: Split at 4-5 sentences for LCD readability

See `.claude/skills/markdown-writing/SKILL.md` for detailed guidelines.

### Outline Chapters (7+)

Chapters 7+ are unfinished outlines with different formatting:

- `## Section` headers with `---` dividers between sections
- Sections: Content, World Building Elements, Power Rankings, Beasties, Artifacts, Spells, Americana, Characters, Hero's Journey, Summary, Loose Ends
- Use `###` subsections within Summary for story beats
- Status markers: `**Name** (NEW)` or `**Name** (RECURRING)`
- Tables need header row + separator (`| --- | --- |`)
- Use `<br>` for spacing after tables

### Character Profiles

Character files use a structured template:

- Header: `Name [MBTI - Archetype]` + `Age • Aura Type/Location`
- Sections: Role in Story, Goal, Physical Description, Personality, Occupation, Habits/Mannerisms, Background, Internal Conflicts, Powers, Artifacts, Contracted Beasties, Spells, Notes
- Powers format: Table with Beginning/End/Potential columns
- No `---` dividers between sections (unlike outline chapters)

### Location Profiles

Location files use a structured template:

- Subtitle: `Region • Country` format
- Sections: Overview, Geography, Climate, Flora, Human Elements, Cryptids, Coordinates, Notes
- Flora uses `**Label**:` for subsections (Trees, Medicinal Plants)
- Placeholders: `_(Description needed)_` for incomplete sections

### Codex Entries

Codex files are reference/notes documents:

- Subtitle: `Category • Subcategory` format (e.g., "Writing Guidelines • Chapter Requirements")
- Use tables for structured data (rules, checklists)
- Use bullet lists for unstructured notes
- Include `## Notes` section at end

### World Lore Documents

World files document timelines, power systems, and reference material:

- Subtitle: `Category • Description` format
- Tables preferred for structured reference data
- Use `—` (em dash) for empty values, not "N/A"
- Inline definitions: `**Name** — Description`

## UI Theme

LCD screen aesthetic with:

- **LCD Green**: #9ead6f (base), #5e6e4a (dark), #c8d89a (light)
- **Amber**: #d4a857 (active/selected), #e8c878 (hover)
- **Font**: VT323 monospace

Key CSS classes:

- `.lcd-screen` - Main container with scanline effect and CRT vignette
- `.zaurus-detail` - Content area for markdown
- `.lcd-btn` - LCD-style buttons
- `.lcd-titlebar` - Amber-glowing title bar
- `.corrupted-content` - Glitch effects (scan line, subtle shifts)
- `.locked-content` - Password entry screen styling

## Secret Files System

Files can be marked as **locked** (password-protected) in `src/config/secretFiles.ts`.

### Configuration

```typescript
// src/config/secretFiles.ts
export const secretFiles: Record<string, SecretFileConfig> = {
  "characters/dark-caster": {
    locked: { password: "adam", hint: "Who is the dark figure's secret identity?" },
  },
  "codex/book-bible": {
    locked: { password: "cryptid", hint: "The nation of ___" },
  },
};
```

### Password Rules

- Passwords are **case-insensitive** (user input is lowercased before comparison)
- Store passwords in lowercase in the config

### Components

- **LockedContent** - Password entry with unlock animation
  - Props: `correctPassword`, `hint?`, `onUnlockComplete`, `children`
  - Shows "ACCESS GRANTED" animation on correct password

- **CorruptedBanner** - Warning banner (manually placed in markdown)
  - In markdown files, use raw HTML: `<div class="corrupted-banner">⚠ YOUR MESSAGE ⚠</div>`
  - Default message: "FILE INTEGRITY COMPROMISED"

### Unlock Persistence

Unlocked files are stored permanently in localStorage under `metazaurus-unlocked`.

To reset for testing (browser console):

```javascript
localStorage.removeItem("metazaurus-unlocked"); // Clear all
```

## Images in Markdown

Images must be placed in `public/images/` to be accessible in markdown files.

### Basic Usage

```html
<img src="/images/filename.png" />
```

### Constrain Size

```html
<img src="/images/filename.png" style="width: 100%; max-width: 500px;" />
```

### Side-by-Side (Responsive)

```html
<div style="display: flex; gap: 12px; flex-wrap: wrap;">
  <img src="/images/img1.png" style="flex: 1 1 200px; max-width: 400px;" />
  <img src="/images/img2.png" style="flex: 1 1 200px; max-width: 400px;" />
</div>
```

### LCD Styling

Images in `.zaurus-detail` automatically get LCD styling:

- Green tint via CSS filters (sepia + hue-rotate)
- Dark green border (#5e6e4a)
- Reduced contrast for retro look

## Visual Effects

### CRT Vignette

Applied to `.lcd-screen::after` - radial gradient darkening edges to simulate curved CRT glass.

### Corrupted/Glitch Effects

Applied globally via `.corrupted-content` on the main content area:

- Subtle horizontal micro-shifts
- Occasional color hue shifts
- Red scan line sweeping down the screen

Configurable in `src/styles/zaurus.css` under "CORRUPTED / GLITCH EFFECT STYLES".

## Content Loading

Content is loaded via Vite's glob import:

- Markdown files: `import.meta.glob("/data/**/*.md", { query: "?raw" })`
- PDF files: `import.meta.glob("/data/**/*.pdf", { query: "?url" })`

Data is pre-loaded and cached at module initialization in `useWikiData.ts`.

## Skill Activation

- Writing/editing markdown content → `markdown-writing` skill
- Debugging issues → `systematic-debugging` skill
- UI components → `react-ui-patterns` skill

## Homepage

The homepage (`src/pages/HomePage.tsx`) displays a hacker terminal aesthetic with:

- ASCII art logo imported from `src/assets/ascii-art.txt`
- Animated boot sequence with staggered message reveals
- Blinking cursor effect
- Full-screen terminal layout (no bordered frame)

### ASCII Art Import

Import text files as raw strings using Vite's `?raw` query:

```typescript
import logoArt from "../assets/ascii-art.txt?raw";
```

### Design References

- `src/assets/home.jpg` - Sharp Zaurus PDA reference (boot screen)
- `src/assets/home2.jpg` - Sharp Zaurus home screen with moon graphic
- The homepage design is inspired by the Sharp Zaurus PDA aesthetic

### Logo Assets

- `src/assets/MetaZaurus_Icon_logo.jpg` - Full color logo (used on homepage content)
- `src/assets/logo.svg` - SVG logo (used in titlebar with CSS filter for amber tint)
- `src/assets/ascii-art.txt` - ASCII art version of the logo

## Cards Section

The Cards page (`src/pages/CardsPage.tsx`) displays collectible cards in a binder aesthetic using react-window v2 for virtualized rendering.

### Layout

- Left panel: Card set list (sub-menu for navigating between sets)
- Right panel: Virtualized 4-column grid with dark binder background

### Card Interface

```typescript
interface Card {
  number: number;
  name: string;
  filename: string;
  variant?: "H" | "RH"; // H = Holo, RH = Reverse Holo
}
```

### Card Sets Configuration

Card sets are defined in `src/config/cardSets.ts`:

```typescript
export const cardSets: CardSet[] = [
  {
    id: "cryptid-nation",
    name: "Cryptid Nation",
    shortName: "CN",
    cdnPath: "https://gaichu.b-cdn.net/mz/cn",
    totalCards: 159,
    cards: cryptidNationCards,
  },
];
```

### Adding New Card Sets

1. Create a card array with `Card` objects (number, name, filename, optional variant)
2. Add a new entry to the `cardSets` array
3. Cards load from CDN: `${cdnPath}/${card.filename}`

### Card Variants

Cards can have multiple variants with the same number:

- Base cards (no variant) or `variant: "H"` for Holo
- `variant: "RH"` for Reverse Holo alternate art

Use `card.filename` as unique key when mapping cards.

### Grid Configuration

Grid settings are in `src/constants/layout.ts`:

```typescript
export const CARD_GRID = {
  COLUMNS: 4,
  GAP: 12,
  PADDING: 16,
  ASPECT_RATIO: 63 / 88, // Standard TCG card ratio
};
```

The grid uses react-window v2's percentage-based column widths (`"25%"` for 4 columns) to automatically fill the container width. Row height is calculated from the card aspect ratio.

### Styling

CSS classes in `src/styles/zaurus.css`:

- `.cards-binder-bg` - Dark leather texture background
- `.card-slot` - Individual card pocket (63:88 aspect ratio)
- `.card-slot-interactive` - Hover/click effects for cards
- `.card-image` - Card image styling

### Design Reference

- `src/assets/Binder-Test.pdf` - Binder layout reference

## Common Commands

```bash
npm run dev          # Start dev server (port 5173)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```
