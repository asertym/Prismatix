# Prismatix

Prismatix is a sophisticated, high-performance color utility and design toolkit built with Svelte 5 and Tailwind CSS 4. It provides developers and designers with essential tools for color manipulation, contrast checking, and gradient generation, all within a modern, reactive interface.

## 🚀 Tech Stack

- **Framework**: [Svelte 5](https://svelte.dev/) with [Vite](https://vitejs.dev/) (SvelteKit)
- **Stylting**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Color Utilities**: `colorjs.io`, `apca-w3`, `color-namer`, `nearest-color`
- **Package Manager**: pnpm

## 🛠 Features & Routes

Prismatix offers a suite of specialized tools accessible via the following routes:

- **[Palette Generator](/palette-generator)**: The main tool of the project, a alette generator with component previews that's trying to be as useful as possible.
- **[/gradient-generator](/gradient-generator)**: An intuitive interface for creating and customizing complex CSS gradients.
- **[/image-picker](/image-picker)**: A tool to extract color palettes and information from uploaded images.
- **[/color-converter](/color-converter)**: Seamlessly convert colors between different formats (HEX, RGB, HSL, etc.).
- **[/contrast-checker](/contrast-checker)**: Ensure WCAG compliance by checking the contrast ratio between foreground and background colors using APCA or standard algorithms.

## 🏗 Architecture

The project follows an atomic design pattern to ensure scalability and maintainability:

- **Components (`src/lib/components/`)**: Atomic UI elements such as `Button`, `Input`, `Select`, and `Icon`.
- **Modules (`src/lib/modules/`)**: Larger, page-level sections like `Hero`, `Header`, `Footer`, and `Pricing`.
- **Assets (`src/lib/assets/`)**: Static assets including icons and fonts.

## ⚙️ Development Workflow

### Generating Imports

To maintain clean imports across the project, Prismatix uses barrel files. Whenever you add new components or modules, regenerate the exports:

```bash
node genImports.js components
node gen・・genImports.js modules
```

### Linting & Formatting

The project uses Prettier and ESLint to ensure code quality. Run the following command to check for errors:

```bash
npm run lint
```

## 🔧 Configuration & Aliases

The project utilizes SvelteKit aliases for cleaner imports:

- `$components` → `src/lib/components`
- `$modules` → `src/lib/modules`
- `$assets` → `src/lib/assets`
- `$icons` → `src/lib/assets/icons`
- `$styles` → `src/lib/styles/style.css`
