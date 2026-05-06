# AGENTS.md - Prismatix Repository Instructions

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

## Tech Stack

- **Framework**: Svelte 5 with Vite (SvelteKit)
- **CSS**: Tailwind CSS 4
- **Color Tools**: `colorjs.io`, `apca-w3`, `color-namer`, `nearest-color`
- **Package Manager**: pnpm

## Core Directories

- `src/lib/components/`: Atomic UI elements (`Button`, `Icon`, `Input`, `Select`)
- `src/lib/modules/`: Page-level sections (`Header`, `Footer`, `Hero`, `Pricing`, etc.)
- `src/routes/`: SvelteKit routing and page components
- `src/lib/assets/`: Static assets, icons
- `src/lib/utils/`: Color utilities (contrastCheck.js, genPalette.js, genSVG.js, utils.js)
- `static/`: Fonts, images, robots.txt

## Commands

| Command       | Purpose                      |
| ------------- | ---------------------------- |
| `pnpm dev`    | Start development server     |
| `pnpm build`  | Production build             |
| `pnpm lint`   | Check with Prettier + ESLint |
| `pnpm format` | Auto-format with Prettier    |

## Critical Workflows

### Barrel File Generation

After adding new `.svelte` files to `components/` or `modules/`, regenerate barrel exports:

```bash
node genimports components
node genimports modules
```

### Lint Order Matters

Run `pnpm lint` which executes: `prettier --check . && eslint .`

## Routes

- `/palette-generator` - Main tool (palette generator)
- `/gradient-generator` - CSS gradient creation
- `/image-picker` - Extract colors from images
- `/color-converter` - Convert between color formats
- `/contrast-checker` - WCAG compliance checking

## Prettier Configuration

- Single quotes, no trailing commas
- 100 char print width
- Tabs enabled (`useTabs: true`)
- Tailwind CSS plugin sorting on `src/routes/layout.css`
- Svelte files parsed with `parser: "svelte"`

## Build Config

- Vite excludes image packages from optimizeDeps: @jsquash/avif, @jsquash/jpeg, @jsquash/jxl, @jsquash/png, @jsquash/webp
- SvelteKit uses mdsvex for Markdown support with `.md` extension

## SvelteKit Aliases

```js
$components → src/lib/components
$modules → src/lib/modules
$assets → src/lib/assets
$icons → src/lib/assets/icons
$styles → src/lib/styles/style.css
$content → src/lib/content/
$data → src/lib/data/
```

## Color Utilities Location

Color-related utilities live in `src/lib/utils/`:

- `contrastCheck.js` - WCAG contrast checking
- `genPalette.js` - Palette generation
- `genSVG.js` - SVG color generation
- `utils.js` - General utilities
- `exportRender.js` - Export rendering helpers
