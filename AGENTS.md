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
- **Package Manager**: npm

## Core Directories

- `src/lib/components/`: Atomic UI elements (`Button`, `Icon`, `Input`, `Select`)
- `src/lib/modules/`: Page-level sections (`Header`, `Footer`, `Hero`, `Pricing`, etc.)
- `src/routes/`: SvelteKit routing and page components
- `src/lib/assets/`: Static assets, icons
- `static/`: Fonts, images, robots.txt

## Commands

| Command          | Purpose                      |
| ---------------- | ---------------------------- |
| `npm run dev`    | Start development server     |
| `npm run build`  | Production build             |
| `npm run lint`   | Check with Prettier + ESLint |
| `npm run format` | Auto-format with Prettier    |

## Critical Workflows

### Barrel File Generation

After adding new `.svelte` files to `components/` or `modules/`, regenerate barrel exports:

```bash
node genImports.js components
node genImports.js modules
```

### Lint Order Matters

Run `npm run lint` which executes: `prettier --check . && eslint .`

## Prettier Configuration

- Single quotes, no trailing commas
- 100 char print width
- Tabs enabled (`useTabs: true`)
- Tailwind CSS plugin sorting on `src/routes/layout.css`
- Svelte files parsed with `parser: "svelte"`

## SvelteKit Aliases

```js
$components → src/lib/components
$modules → src/lib/modules
$assets → src/lib/assets
$icons → src/lib/assets/icons
$styles → src/lib/styles/style.css
```

## Color Utilities Location

Color-related utilities live in `src/lib/`:

- `contrastCheck.js` - WCAG contrast checking
- `genPalette.js` - Palette generation
- `genSVG.js` - SVG color generation
- `utils.js` - General utilities
- `exportRender.js` - Export rendering helpers
