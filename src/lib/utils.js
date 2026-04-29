import Color from 'colorjs.io';
import genSVGPalette from '$lib/genSVG';
import colorNamer from 'color-namer';
import { toast } from 'svelte-sonner';

// Copy generated code
export function copyRender(content) {
	navigator.clipboard.writeText(content);
}

// Copy Figma SVG
export function copyFigma(palette) {
	let source = genSVGPalette(palette);
	navigator.clipboard.writeText(source);
}

export function tweakColor(color, Hue, Sat) {
	let tweaked = new Color(color);
	tweaked.hsl.h = Hue;
	tweaked.hsl.s = Sat;

	return tweaked;
}

export function nameThatColor(input) {
	const nearest = colorNamer(input, { pick: 'ntc' }).ntc[0].name;
	return nearest;
}

export function handlePaste(e) {
	e.preventDefault();
	const pastedData = e.clipboardData.getData('text');

	return pastedData;
}

export function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			}
		: null;
}

export function luminance(r, g, b) {
	let a = [r, g, b].map((v) => {
		v /= 255;
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	});
	return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function PXtoPT(px, failedMessage) {
	if (typeof px == 'number') return (px * (72 / 96)).toFixed(2);
	return failedMessage;
}

export function copyValue(value, message) {
	navigator.clipboard.writeText(value);
	toast(message ?? 'Copied to clipboard!');
}

export function debounce(fn, delay = 300) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
}
