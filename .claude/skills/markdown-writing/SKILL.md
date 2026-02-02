# Markdown Writing Skill for MetaZaurus

Guidelines for writing and formatting markdown content in the MetaZaurus project.

## Markdown Renderer

The project uses **react-markdown** with the following plugins:
- `remark-gfm` - GitHub Flavored Markdown (tables, strikethrough, task lists, autolinks)
- `rehype-raw` - HTML tag support (`<br>`, `<span>`, etc.)

Component location: `src/components/content/MarkdownContent.tsx`

## Supported Syntax

### Basic Formatting
| Syntax | Renders As |
|--------|------------|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `# Heading 1` | H1 heading |
| `## Heading 2` | H2 heading (renders as section label) |
| `---` | Horizontal rule (gradient divider) |

### Line Breaks
Use `<br>` for line breaks within a block (e.g., credits):
```markdown
**Written by Author Name**<br>
**Art by Artist Name**<br>
**Edited by Editor Name**
```

### Section Dividers
Use `---` for horizontal rules between major sections:
```markdown
Some content here.

---

## New Section
```

### Blockquotes
Use `>` for quoted text, radio dialogue, or emphasized passages:
```markdown
> "Hooo boy, is anyone reading this?" the announcer said.
>
> "This is Cyril, your lovely host!"
```

Blockquotes render with:
- Subtle green background
- Amber left border
- Italic text

### Special Sections (In-Story Documents)

For academic papers, notes, or other in-story documents:

**Academic Paper:**
```markdown
## Academic Paper Excerpt

**Title of the Paper**

*Author A., Author B.*<br>
*University Name, Department*

**Abstract:** Content here...
```

**Character Notes:**
```markdown
## Sam's Notes on Point Pleasant - 5/10/2031

**On topic one:** Description...

**On topic two:** Description...
```

## Styling Reference

The markdown renders inside `.zaurus-detail` with these styles:
- H1: Large title with bottom border
- H2: Uppercase section label (small, muted)
- H3: Subsection heading
- Paragraphs: 17px VT323 monospace font
- Links: Amber colored with hover glow
- Blockquotes: Green background, amber border, italic
- HR: Gradient fade line

## Content Organization Tips

1. **Break up long paragraphs** - Keep paragraphs to 3-4 sentences for readability
2. **Use section dividers** - Add `---` between major story beats or time jumps
3. **Separate abilities/descriptions** - Give each distinct item its own paragraph
4. **Credits at top** - Use `<br>` for multi-line credits block

## Consistency Guidelines

### Punctuation & Typography

| Element | Correct | Incorrect |
|---------|---------|-----------|
| Ellipsis | `...` (three periods) | `…` (ellipsis character) |
| Em dash | `—` (no spaces) | `--` or ` — ` |
| Emphasis | `_italic_` or `*italic*` | Mixed styles |

**Introducing dialogue/action** - Use comma before what follows:
```markdown
"Check this out," the Cryptid Buster said as he pushed the button.
```

### Dialogue & Internal Thoughts

**Internal thoughts** - Always italicized:
```markdown
_Eyes forward, don't look, don't look..._ Sam thought to himself.
```

**Subtle sound effects** - Italicized:
```markdown
the distinct _click-clack_ of his dress shoes
```

**Dramatic/loud sound effects** - Bolded:
```markdown
**BAM... BAM... BAM!**

**THWACK!**

**THUNK**
```

**Radio broadcasts/quoted speech in blockquotes** - Plain text (not italicized):
```markdown
> "This is Cyril, your host!" the announcer said.
>
> "Welcome to CryptidCast!" He continued with enthusiasm.
```

**Spirit voices in blockquotes** - Italicized (like internal thoughts):
```markdown
> _Samantha... forgive me._
>
> _Oh god, why is it so dark?_
```

### Blockquote Attribution

Include speaker attribution for clarity in multi-speaker dialogue:
```markdown
> "What do you think, Jim?" Lawrence asked.
>
> "Hard to say, Lawrence..." Jim trailed off.
```

### Author's Note Signature

Use this format consistently:
```markdown
Sincerely and happily yours,

_M. Waddell_
```

### Paragraph Length

- Split paragraphs longer than 4-5 sentences at natural breaks
- Especially important for expository passages (lore, explanations)
- Helps readability on the LCD screen aesthetic

## Outline Chapters (7+)

Chapters 7 and beyond are unfinished outlines with different formatting than finished narrative chapters (1-6).

### Structure

```markdown
# 7. Chapter Title

## Content

**Center Image:** Description of illustration
**Poem/Journal Entry:** Notes on opening content
**Location:** Place name (GPS coordinates)
**Date:** Time period
**Weather:** Environmental details

---

## World Building Elements

- Bullet points for lore details

---

## Power Rankings

**Power Levels for Casters revealed!**

| Type              | Level       |
| ----------------- | ----------- |
| Apprentice Caster |             |
| Caster            | 1/1,000     |

<br>

**Note:** Additional context...

---

## Beasties

- **Snipe** (NEW)
- **Loveland Frogman** (RECURRING)

---

## Artifacts

**P9001 Kit** (NEW)
Description of the artifact.

**EMF Device** (RECURRING)
Description of the artifact.

---

## Spells

**Snipe Hunt**
Description of the spell.

---

## Americana

- Cultural/setting details

---

## Characters

- **Sam Sinclair** (RECURRING)
- **Love** (RECURRING)

---

## Hero's Journey

**Stage:** Stage name
**Description:** What happens in this stage
**Character Flaw:** Sam's weakness
**Lesson:** What Sam learns
**Growth:** How Sam changes

---

## Summary

Opening prose describing the chapter's events.

### Training Regimen

**Aura** - Description of training element
**Speed** - Description of training element

### Healing & Mechanics

Prose about mechanics introduced.

### Progress

Plot progression notes.

### Halloween Night

Specific scene notes.

### Notes

- Production notes
- Things to remember

---

## Loose Ends

- Open questions
- Unresolved threads

---
```

### Key Patterns

- **Section headers**: `## Section` with `---` dividers between
- **Subsections in Summary**: Use `###` for story beats
- **Status markers**: `(NEW)` or `(RECURRING)` after item names
- **Tables**: Include header row and `| --- | --- |` separator
- **Spacing**: Use `<br>` between table and following text
- **Placeholders**: Use `_(Description needed)_` for missing content
- **Empty values**: Leave table cells blank rather than "N/A"

## Character Profiles

Character files follow a structured template for documenting story characters.

### Structure

```markdown
# Character Name

Character Name [MBTI - Archetype]
Age • Aura Type/Location

## Role in Story

Brief description of narrative function.

## Goal

Character motivations and objectives.

Main Goal: Primary objective

## Physical Description

Appearance details.

## Personality

Character traits and behavior patterns.

## Occupation

What they do (e.g., Rogue Caster, Student).

## Habits/Mannerisms

Distinctive behaviors.

## Background

Backstory and history.

## Internal Conflicts

Inner struggles and contradictions.

## Powers

| Beginning | End | Potential |
| --- | --- | --- |
| X | Y | Z |

**Abilities**:
- Special ability

## Artifacts

- Item Name
- Another Item

## Contracted Beasties

- Beastie Name
- Another Beastie

## Spells

- Spell Name
- Another Spell

## Notes

Meta notes about the character or story considerations.
```

### Key Patterns

- **Header line 1**: `Character Name [MBTI - Archetype]` with two trailing spaces for line break
- **Header line 2**: `Age • Aura Type` or `Age • Location`
- **Powers format**: Table with Beginning/End/Potential columns; use `**Abilities**:` or `**Boosted**:` for additional info
- **Section headers**: `## Section` without dividers between (unlike outline chapters)
- **Main Goal**: Can appear as standalone line after Goal prose
- **Archetypes**: Hero, Foil, Mentor, Researcher, etc.
- **Placeholders**: Use `_(Description needed)_` for missing content

### Common MBTI/Archetype Pairs

| Character | MBTI | Archetype |
|-----------|------|-----------|
| Sam Sinclair | ESTP | Daredevil |
| Adam Ackler | INTJ | Foil |
| Love Lancelot | ENFJ | Mentor |
| Rose Robinson | INTP | Researcher |

## Location Profiles

Location files document settings and places in the story world.

### Structure

```markdown
# Location Name

Region • Country

## Overview

General description of the location.

## Geography

Terrain, landmarks, notable features.

## Climate

Weather patterns, seasonal changes.

## Flora

**Trees**: Species list

**Medicinal Plants**: Plant species

## Human Elements

Buildings, infrastructure, settlements.

## Cryptids

- Cryptid Name
- Another Cryptid

## Coordinates

Latitude, Longitude

## Notes

Additional notes or story considerations.
```

### Key Patterns

- **Subtitle line**: `Region • Country` format (using bullet point •)
- **Section headers**: `## Section` without dividers between
- **Flora subsections**: Use `**Label**:` for categories
- **Placeholders**: Use `_(Description needed)_` for missing content
- **Coordinates**: Raw decimal format

## Codex Entries

Codex files are reference documents for writing guidelines, series structure, and production notes.

### Structure

```markdown
# Document Title

Category • Subcategory

## Section Name

Content organized by topic.

## Another Section

| Column 1 | Column 2 |
| --- | --- |
| Data | Data |

## Notes

_(Additional notes)_
```

### Key Patterns

- **Subtitle line**: `Category • Subcategory` format
- **Tables**: Use for structured data (rules, checklists, book lists)
- **Bullet lists**: For unstructured notes or questions
- **Bold labels**: `**Label**:` for inline definitions
- **Open questions**: List format with `?` endings

### Common Codex Categories

| Document Type | Subtitle Example |
|--------------|------------------|
| Series Bible | Series Bible • Book Structure |
| Writing Rules | Writing Guidelines • Chapter Requirements |
| Book Notes | Book 1 Notes • Structure & Guidelines |

## World Lore Documents

World files document lore, timelines, and reference material.

### Timeline Structure

```markdown
# Timeline

World Events • Chronology

## Era Name

| Year | Month | Event |
| --- | --- | --- |
| 2021 | — | Event description |
| 2022 | March | Specific event |

## Notes

_(Additional notes)_
```

### Reference Document Structure

```markdown
# Document Title

Category • Description

## Category Name

| Item | Description |
| --- | --- |
| Item Name | What it does |

## Another Category

- **Item Name** — Brief description

## Notes

_(Additional notes)_
```

### Key Patterns

- **Subtitle line**: `Category • Description` format
- **Tables**: Preferred for structured reference data
- **Em dash in lists**: `**Name** — Description` for inline definitions
- **Empty month/values**: Use `—` (em dash) not "N/A"
- **Placeholders**: `_(Description needed)_` for missing content

## File Locations

- Book chapters: `data/book/chapter-*.md`
- Characters: `data/characters/*.md`
- Locations: `data/locations/*.md`
- World lore: `data/world/*.md`
- Codex entries: `data/codex/*.md`
