# Prismatix - Agent Documentation

## Project Overview

Prismatix is a sophisticated palette generator designed for both designers and developers. The application enables users to create, preview, and export CSS color palettes. The generation logic and color relationships are inspired by the design principles found in _Refactoring UI_ and follow the structural standards established by _Tailwind CSS_.

A key feature of Prismatix is its interactive preview system: the application provides on-page components (modules) that dynamically update their styling to reflect the current active color palette, providing a real-world look at how colors work in a UI context.

## Project Structure

The project follows a highly organized component-based architecture to promote reusability and clarity.

### Core Directories

- `src/lib/components/`: Contains small, atomic UI elements. These are the building blocks of the application. They are designed to be low-level and highly reusable.
- `src/lib/modules/`: Contains larger, more complex components that represent standalone sections or entire page layouts. These modules compose multiple elements from the `components` folder.
- `src/routes/`: Contains the SvelteKit routing logic and page-level components.
- `static/`: Holds static assets such as fonts, images, and robots.txt.

### Automation & Imports

To maintain clean import statements and reduce manual maintenance, the project uses an automated approach for barrel files:

- **`genImports.js`**: A utility script executed via Node.js. When run with a target directory (e.g., `node genImports.js components`), it scans the specified folder for `.svelte` files and generates an `index.js` file. This file automatically exports all found components using PascalCase naming conventions derived from their filenames.

## Code Standards & Technologies

### Tech Stack

- **Framework**: [Svelte 5](https://svelte.dev/) (utilizing Svelte Runes for reactivity).
- **CSS Framework**: [Tailwind CSS 4](https://tailwindcss.com/).
- **Build Tool**: [Vite](https://vitejs.dev/).
- **Color Logic**: Powered by `colorjs.io`, `apca-w3`, and specialized palette generation utilities.

### Development Standards

- **Naming Conventions**:
  - Component files: `.svelte` (e.g., `button.svelte`).
  - Exported names in `index.js`: PascalCase (e.g., `Button`).
- **Linting & Formatting**:
  - **ESLint**: Used for code quality and identifying potential errors.
  - **Prettier**: Enforces consistent code formatting.
  - **Tailwind Plugin**: `prettier-plugin-tailwindcss` is used to ensure CSS classes are organized in a standard, predictable order.
- **Component Pattern**:
  - Prefer atomic design: Build small elements in `components/` before assembling them into `modules/`.
  - Modules should be self-contained blocks of functionality or layout sections.

## Workflow for Agents

When contributing to this project, agents should:

1. Use the `genImports.js` script whenever new components or modules are added to ensure the `index.js` barrels are up to date.
2. Adhere to Svelte 5 rune syntax for all reactive logic.
3. Ensure all Tailwind classes follow the standard sorting provided by the Prettier plugin.
4. Maintain the separation between atomic `components` and structural `modules`.
