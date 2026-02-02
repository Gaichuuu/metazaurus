# MetaZaurus

The ultimate PDA reader application for MetaZoo: Cryptid Nation lore, built with Zaurus-inspired LCD aesthetic.

**Website:** [www.metazaurus.com](https://www.metazaurus.com)

## About

The original MetaZaurus fan site launched in August 2021, and focused on a high-resolution card database. This relaunch includes these card scans, but the focus has shifted to documenting the lore of Cryptid Nation.

## Features

- **MetaZoo Knowledge** — Learn about the characters, locations, and secrets about the world
- **PDF Viewer** — Read magazines and manga with integrated PDF support
- **Cards** — View card sets in a binder-style layout
- **Book** - Never before seen Chapters of the MetaZoo Bible
- **Secret Files** — Password-protected RESTRICTED content

## Build

Feel free to build locally. All content is open for use however you'd like. Enjoy~

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Structure

```
src/
├── components/
│   ├── content/    # MarkdownContent, PdfViewer, DetailView
│   └── layout/
├── config/         # Categories, secrets, card sets
├── hooks/
├── pages/
├── styles/
└── utils/

data/
├── book/
├── characters/
├── locations/
├── world/
└── codex/

```

## License

MIT
