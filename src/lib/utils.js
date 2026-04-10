import Color from 'colorjs.io';
import genSVGPalette from '$lib/genSVG';
import colorNamer from 'color-namer';

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
