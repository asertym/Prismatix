# Color Thief v3 Documentation

Complete guide for extracting colors from images and videos using Color Thief v3.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Quick Start Examples](#quick-start-examples)
4. [API Reference](#api-reference)
5. [Options Reference](#options-reference)
6. [Color Object API](#color-object-api)
7. [Swatches API](#swatches-api)
8. [observe() API](#observe-api)
9. [Source Types](#source-types)
10. [Async vs Sync API](#async-vs-sync-api)
11. [CLI Usage](#cli-usage)
12. [FAQ](#faq)

---

## Introduction

Color Thief v3 is a powerful color extraction library that grabs colors from any image or video. Completely rewritten in TypeScript with zero browser dependencies, it offers:

- **OKLCH quantization** for perceptually uniform palettes
- **Semantic swatches** with automatic text color recommendations
- **Real-time video observation** for reactive designs
- **Async/Worker support** to keep UI responsive
- **Node.js support** via sharp image processing

**Stats:** 13,000+ GitHub stars, 7M+ annual npm downloads.

---

## Installation

```bash
npm install colorthief
```

> Note: The package name is `colorthief` (not `color-thief`).

### Node.js Setup

Requires [sharp](https://www.npmjs.com/package/sharp) as a peer dependency:

```bash
npm install sharp
```

### Browser Setup

#### Script Tag (UMD)

```html
<script src="https://unpkg.com/colorthief@3/dist/umd/color-thief.global.js"></script>
<script>
	const color = ColorThief.getColorSync(img);
	console.log(color.hex());
</script>
```

#### ES Module

```html
<script type="module">
	import { getColorSync } from 'https://unpkg.com/colorthief@3/dist/index.js';

	const img = document.querySelector('img');
	img.addEventListener('load', () => {
		const color = getColorSync(img);
		console.log(color.hex());
	});
</script>
```

#### With a Bundler

```javascript
import { getColor, getPalette } from 'colorthief';
```

---

## Quick Start Examples

### 1. Get the Dominant Color

```javascript
import { getColorSync } from 'colorthief';

const color = getColorSync(img);
console.log(color.hex()); // '#e84393'
console.log(color.css()); // 'rgb(232, 67, 147)'
```

### 2. Get a Color Palette

```javascript
import { getPaletteSync } from 'colorthief';

const palette = getPaletteSync(img, { colorCount: 8 });
palette.forEach((c) => console.log(c.hex()));
```

### 3. Observe a Video Source

```javascript
import { observe } from 'colorthief';

const controller = observe(videoElement, {
	throttle: 200,
	colorCount: 5,
	onChange(palette) {
		const [dominant] = palette;
		document.body.style.background = dominant.css();
	}
});

// Later — clean up
controller.stop();
```

### 4. Get Semantic Swatches

```javascript
import { getSwatchesSync } from 'colorthief';

const swatches = getSwatchesSync(img);

if (swatches.Vibrant) {
	header.style.background = swatches.Vibrant.color.css();
	header.style.color = swatches.Vibrant.titleTextColor.css();
}

if (swatches.DarkMuted) {
	sidebar.style.background = swatches.DarkMuted.color.css();
	sidebar.style.color = swatches.DarkMuted.bodyTextColor.css();
}
```

### 5. Get Color Proportions

```javascript
const palette = getPaletteSync(img, { colorCount: 8 });

palette.forEach((color) => {
	console.log(color.hex(), color.proportion);
	// e.g., "#4a6741" 0.32
});
```

### 6. Use Quality Settings

```javascript
getPaletteSync(img, { quality: 1 }); // Every pixel (slowest)
getPaletteSync(img, { quality: 10 }); // Every 10th pixel (default)
getPaletteSync(img, { quality: 50 }); // Every 50th pixel (fastest)
```

### 7. Async API

```javascript
import { getColor, getPalette } from 'colorthief';

const color = await getColor(img);
const palette = await getPalette(img, { colorCount: 6 });

// Offload to Web Worker (browser only)
const workerPalette = await getPalette(img, {
	colorCount: 6,
	worker: true
});
```

---

## API Reference

### Functions

#### `getColor(source, options?)`

Extracts the single dominant color from an image. Returns a [Color](#color-object-api) object, or `null` if extraction fails.

**Returns:** `Promise<Color | null>`

**Example:**

```javascript
import { getColor } from 'colorthief';

const color = await getColor(img);
console.log(color.hex()); // '#e84393'
```

---

#### `getColorSync(source, options?)`

Synchronous version of `getColor()`. Browser sources only — does not support Node.js, Web Workers, or AbortSignal.

**Returns:** `Color | null`

**Example:**

```javascript
import { getColorSync } from 'colorthief';

const color = getColorSync(img);
console.log(color.rgb()); // { r: 232, g: 67, b: 147 }
```

---

#### `getPalette(source, options?)`

Extracts a multi-color palette. Returns an array of [Color](#color-object-api) objects sorted by population (most dominant first), or `null` if extraction fails.

**Returns:** `Promise<Color[] | null>`

**Example:**

```javascript
import { getPalette } from 'colorthief';

const palette = await getPalette(img, { colorCount: 8 });
palette.forEach((c) => console.log(c.hex()));
```

---

#### `getPaletteSync(source, options?)`

Synchronous version of `getPalette()`. Browser sources only.

**Returns:** `Color[] | null`

**Example:**

```javascript
import { getPaletteSync } from 'colorthief';

const palette = getPaletteSync(img, { colorCount: 10 });
console.log(palette[0].hex()); // Most dominant color
```

---

#### `getSwatches(source, options?)`

Extracts semantic swatches classified into six roles: Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant, and LightMuted. Uses `colorCount: 16` internally for best classification results.

**Returns:** `Promise<SwatchMap>`

**Example:**

```javascript
import { getSwatches } from 'colorthief';

const swatches = await getSwatches(img);

if (swatches.Vibrant) {
	console.log(swatches.Vibrant.color.hex());
	console.log(swatches.Vibrant.titleTextColor.hex());
}
```

---

#### `getSwatchesSync(source, options?)`

Synchronous version of `getSwatches()`. Browser sources only.

**Returns:** `SwatchMap`

**Example:**

```javascript
import { getSwatchesSync } from 'colorthief';

const swatches = getSwatchesSync(img);
console.log(swatches.Muted?.color.hex());
```

---

#### `observe(source, options)`

Reactively watches a video, canvas, or image element and fires a callback with a fresh palette on every frame or change.

**Returns:** `ObserveController`

**Example:**

```javascript
import { observe } from 'colorthief';

const controller = observe(videoElement, {
	throttle: 200,
	colorCount: 5,
	onChange(palette) {
		const [dominant] = palette;
		document.body.style.background = dominant.css();
		header.style.color = dominant.textColor;
	}
});

// Later — clean up
controller.stop();
```

---

#### `configure(options)`

Globally override the pixel loader and/or quantizer used by all extraction functions.

**Returns:** `void`

**Example:**

```javascript
import { configure } from 'colorthief';

configure({
	loader: customPixelLoader,
	quantizer: customQuantizer // Must call init() first
});
```

---

#### `createColor(r, g, b, population, proportion?)`

Factory function to manually create a [Color](#color-object-api) object from RGB values. Useful for building Color objects from data you already have.

**Returns:** `Color`

**Example:**

```javascript
import { createColor } from 'colorthief';

const customColor = createColor(232, 67, 147, 14832);
console.log(customColor.hex()); // '#e84393'
```

---

## Options Reference

All extraction functions accept an options object. The async API supports every option; the sync API omits `signal`, `worker`, and `loader`.

| Option           | Type        | Default   | Description                                                                                             |
| ---------------- | ----------- | --------- | ------------------------------------------------------------------------------------------------------- |
| `colorCount`     | number      | `10`      | Number of colors in the palette (2–20). Used by `getPalette` and `getSwatches`.                         |
| `quality`        | number      | `10`      | Pixel sampling rate. `1` samples every pixel (highest quality, slowest). `10` samples every 10th pixel. |
| `colorSpace`     | string      | `'oklch'` | `'oklch'` or `'rgb'`. OKLCH produces more perceptually uniform palettes.                                |
| `ignoreWhite`    | boolean     | `true`    | Skip pixels that appear white during sampling.                                                          |
| `whiteThreshold` | number      | `250`     | RGB channel value (0–255) above which a pixel is considered white.                                      |
| `alphaThreshold` | number      | `125`     | Alpha value (0–255) below which a pixel is considered transparent and skipped.                          |
| `minSaturation`  | number      | `0`       | Minimum HSV saturation (0–1). Pixels below this saturation are skipped.                                 |
| `signal`         | AbortSignal | —         | Cancel a running extraction. Async API only.                                                            |
| `worker`         | boolean     | `false`   | Offload quantization to a Web Worker thread. Browser async API only.                                    |
| `loader`         | function    | —         | Custom pixel decoder. Configure API only.                                                               |
| `quantizer`      | object      | —         | Custom quantization algorithm (must call `init()` first). Configure API only.                           |

---

## Color Object API

Every extracted color is a rich object with format conversions, accessibility metadata, and WCAG contrast ratios.

### Methods

| Method         | Returns       | Description                                                         |
| -------------- | ------------- | ------------------------------------------------------------------- |
| `rgb()`        | `{ r, g, b }` | RGB values, each 0–255.                                             |
| `hex()`        | `string`      | Hex string, e.g. `'#e84393'`.                                       |
| `hsl()`        | `{ h, s, l }` | Hue 0–360, saturation 0–100, lightness 0–100.                       |
| `oklch()`      | `{ l, c, h }` | Lightness 0–1, chroma 0–0.4, hue 0–360.                             |
| `css(format?)` | `string`      | CSS color string. Format: `'rgb'` (default), `'hsl'`, or `'oklch'`. |
| `array()`      | `[r, g, b]`   | RGB tuple as a three-element array.                                 |
| `toString()`   | `string`      | Hex string. Allows direct use in template literals.                 |

### Properties

| Property     | Type           | Description                                                                                                                     |
| ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `textColor`  | `string`       | `'#ffffff'` or `'#000000'` — the recommended foreground text color for readability.                                             |
| `isDark`     | `boolean`      | `true` if the color is perceptually dark (relative luminance ≤ 0.179).                                                          |
| `isLight`    | `boolean`      | `true` if the color is perceptually light.                                                                                      |
| `contrast`   | `ContrastInfo` | WCAG contrast ratios. Contains `white` (number), `black` (number), and `foreground` (Color) — a Color object for readable text. |
| `population` | `number`       | Relative pixel count from the quantizer. Higher values mean more dominant.                                                      |
| `proportion` | `number`       | Fraction of total sampled pixels (0–1).                                                                                         |

**Example:**

```javascript
const color = getColorSync(img);

// Format conversions
color.hex(); // '#e84393'
color.rgb(); // { r: 232, g: 67, b: 147 }
color.hsl(); // { h: 331, s: 77, l: 59 }
color.oklch(); // { l: 0.64, c: 0.21, h: 353 }
color.css(); // 'rgb(232, 67, 147)'
color.css('oklch'); // 'oklch(0.64 0.21 353)'

// Accessibility
color.textColor; // '#ffffff' or '#000000'
color.isDark; // true
color.contrast.white; // 3.42
color.contrast.black; // 6.14
color.contrast.foreground.hex(); // '#ffffff'

// Population
color.population; // 14832
color.proportion; // 0.23
```

---

## Swatches API

`getSwatches()` and `getSwatchesSync()` return a `SwatchMap` — an object with six keys, one for each semantic role. Each value is either a `Swatch` or `null` if no color matched that role.

### SwatchMap Structure

```javascript
{
  Vibrant: Swatch | null,
  Muted: Swatch | null,
  DarkVibrant: Swatch | null,
  DarkMuted: Swatch | null,
  LightVibrant: Swatch | null,
  LightMuted: Swatch | null
}
```

### Swatch Object Properties

| Property         | Type     | Description                                                                                                     |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `color`          | `Color`  | The extracted color for this role.                                                                              |
| `role`           | `string` | The semantic role: `'Vibrant'`, `'Muted'`, `'DarkVibrant'`, `'DarkMuted'`, `'LightVibrant'`, or `'LightMuted'`. |
| `titleTextColor` | `Color`  | Recommended color for title text over this swatch.                                                              |
| `bodyTextColor`  | `Color`  | Recommended color for body text over this swatch.                                                               |

### Swatch Roles

| Role           | Description                                                | Use Case                           |
| -------------- | ---------------------------------------------------------- | ---------------------------------- |
| `Vibrant`      | Bright, saturated colors. Good for primary accents.        | Primary buttons, highlights        |
| `Muted`        | Desaturated, medium brightness. Good for backgrounds.      | Page backgrounds                   |
| `DarkVibrant`  | Saturated and dark. Good for status bars, headers.         | Navigation bars, status indicators |
| `DarkMuted`    | Desaturated and dark. Good for text backgrounds.           | Text containers, cards             |
| `LightVibrant` | Saturated and light. Good for highlights, hover states.    | Hover effects, active states       |
| `LightMuted`   | Desaturated and light. Good for card backgrounds, borders. | Secondary backgrounds              |

**Example:**

```javascript
const swatches = getSwatchesSync(img);

if (swatches.Vibrant) {
	document.body.style.background = swatches.Vibrant.color.css();
	document.body.style.color = swatches.Vibrant.bodyTextColor.css();
	title.style.color = swatches.Vibrant.titleTextColor.css();
}

if (swatches.DarkMuted) {
	sidebar.style.background = swatches.DarkMuted.color.css();
	sidebar.style.color = swatches.DarkMuted.bodyTextColor.css();
}
```

---

## observe() API

Reactively watches a live source and fires a callback with a fresh palette on every frame or change.

### Options

| Option           | Type                         | Required | Default   | Description                                         |
| ---------------- | ---------------------------- | -------- | --------- | --------------------------------------------------- |
| `onChange`       | `(palette: Color[]) => void` | Yes      | —         | Callback fired with a fresh palette on each update. |
| `throttle`       | number                       | No       | `200`     | Minimum milliseconds between updates.               |
| `colorCount`     | number                       | No       | `5`       | Number of colors (2–20).                            |
| `quality`        | number                       | No       | `10`      | Pixel sampling rate.                                |
| `colorSpace`     | string                       | No       | `'oklch'` | `'oklch'` or `'rgb'`.                               |
| `ignoreWhite`    | boolean                      | No       | `true`    | Skip white pixels during sampling.                  |
| `whiteThreshold` | number                       | No       | `250`     | RGB threshold for white detection.                  |
| `alphaThreshold` | number                       | No       | `125`     | Alpha threshold for transparency.                   |
| `minSaturation`  | number                       | No       | `0`       | Minimum HSV saturation.                             |

### ObserveController

The returned controller provides cleanup functionality:

| Method   | Description                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------- |
| `stop()` | Stops observing and cleans up all event listeners and animation frames. Always call this when done. |

### Behavior by Source Type

- **HTMLVideoElement** — Extracts from the current frame on each `requestAnimationFrame` (throttled). Only runs while the video is playing. Also fires on `seeked`.
- **HTMLCanvasElement** — Polls on each `requestAnimationFrame` (throttled).
- **HTMLImageElement** — Extracts immediately if loaded, then watches for `src`/`srcset` attribute changes via MutationObserver. Also listens for the `load` event.

**Example:**

```javascript
const controller = observe(videoElement, {
	throttle: 200,
	colorCount: 5,
	onChange(palette) {
		const [dominant] = palette;
		document.body.style.background = dominant.css();
		header.style.color = dominant.textColor;
	}
});

// Later — clean up
controller.stop();
```

---

## Source Types

The `source` parameter accepts different types depending on the environment.

### Browser Sources

- `HTMLImageElement`
- `HTMLCanvasElement`
- `HTMLVideoElement`
- `ImageData`
- `ImageBitmap`
- `OffscreenCanvas`

### Node.js Sources

Requires the [sharp](https://www.npmjs.com/package/sharp) library as a peer dependency.

- `string` — file path
- `Buffer`

> **Note:** The sync API (`getColorSync`, `getPaletteSync`, `getSwatchesSync`) only accepts browser sources. Use the async API for Node.js.

---

## Async vs Sync API

### When to Use Async

Use the async API when:

- Processing large images
- Extracting colors from multiple images
- Working with very high-resolution canvases
- You want to keep the UI responsive during extraction

The async API breaks the work into chunks and pauses between them, giving the browser time to handle animations, scrolling, and clicks.

### Web Worker Support

Pass `worker: true` to offload quantization to a Web Worker thread entirely (browser-only). This is helpful when processing many images at once or working with very large images.

```javascript
// Offload to Web Worker (browser only)
const workerPalette = await getPalette(img, {
	colorCount: 6,
	worker: true
});
```

### Sync API Limitations

The sync API (`getColorSync`, `getPaletteSync`, `getSwatchesSync`) does not support:

- Node.js environments
- Web Workers (`worker` option)
- AbortSignal cancellation
- Custom loaders/quantizers via `configure()`

---

## CLI Usage

The `colorthief-cli` package bundles everything needed (including sharp for image decoding), so it works immediately with no extra setup.

### Quick Start

```bash
npx colorthief-cli photo.jpg
# Output: #c94f6e
```

### Get Palette

```bash
npx colorthief-cli palette photo.jpg --count 3
# Output:
# #c94f6e
# #5a8fa3
# #d4a853
```

### Get Swatches

```bash
npx colorthief-cli swatches photo.jpg
# Output:
# Vibrant #e84393
# Muted #a0b4c0
# DarkVibrant #8b1a3a
# DarkMuted #4a5568
# LightVibrant #f6a5c1
# LightMuted #d4d8dc
```

### Available Flags

| Flag                | Description                        |
| ------------------- | ---------------------------------- |
| `--json`            | Full color data as JSON            |
| `--css`             | CSS custom properties output       |
| `--count 5`         | Number of palette colors (2-20)    |
| `--quality 1`       | Sampling quality (1 = every pixel) |
| `--color-space rgb` | Quantization space (rgb or oklch)  |

### Stdin Support

```bash
cat photo.jpg | colorthief-cli -
```

### Multiple Files

```bash
colorthief-cli photo1.jpg photo2.jpg photo3.jpg
```

---

## FAQ

### Do I have to wait for the image to load?

Yes. Color Thief will throw a descriptive error if the image hasn't finished loading: `Image has not finished loading`.

**Better approach:**

```javascript
const img = document.querySelector('img');

if (img.complete) {
	getColorSync(img);
} else {
	img.addEventListener('load', () => {
		getColorSync(img);
	});
}
```

### Does it work if the image is hosted on another domain?

Yes, if CORS is configured. Set `access-control-allow-origin` on the server and add `crossorigin="anonymous"` to the image element.

```html
<img src="https://example.com/image.jpg" crossorigin="anonymous" />
```

### How do I get hex values in v2?

In v2, colors are returned as `[r, g, b]` arrays. You had to convert manually:

```javascript
const rgbToHex = (r, g, b) =>
	'#' +
	[r, g, b]
		.map((x) => {
			const hex = x.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		})
		.join('');

rgbToHex(102, 51, 153); // '#663399'
```

**In v3**, just use `color.hex()` — no conversion needed!

### What's the difference between `quality: 1` and `quality: 10`?

- `quality: 1` samples every pixel (highest accuracy, slowest)
- `quality: 10` samples every 10th pixel (default balance)
- Higher values = faster but less accurate

### Can I cancel a color extraction?

Yes, using the async API with an AbortSignal:

```javascript
const controller = new AbortController();

try {
	const color = await getColor(img, {
		signal: controller.signal
	});
} catch (error) {
	if (error.name === 'AbortError') {
		console.log('Extraction cancelled');
	}
}

// Cancel the extraction
controller.abort();
```

### Why are some colors missing from my palette?

The library uses perceptual quantization with OKLCH color space. Colors that are too similar may be merged into a single representative color. Adjust `colorCount` to get more or fewer colors, or increase `quality` for better accuracy.

### How do I use this with SVG images?

SVG files need to be converted to raster format (PNG/JPG) first, as Color Thief works with pixel-based images. You can use a library like `sharp` or `dom-to-image` to convert SVGs before extraction.

---

## License

Color Thief is licensed under the [MIT License](https://github.com/lokesh/color-thief/blob/master/LICENSE).

Created by [Lokesh Dhakar](https://lokeshdhakar.com)
