import Color from 'colorjs.io';

export default function genSVGPalette(palette) {
	const entries = Object.entries(palette);
	const count = entries.length;

	const svgWidth = 1920;
	const rectHeight = 120;
	const gap = 16;
	const rectWidth = Math.floor((svgWidth - gap * (count - 1)) / count);

	const rects = entries.map(([, color], index) => {
		let x = 0;
		if (index > 0) {
			x = index * (rectWidth + gap);
		}
		const colorHex = new Color(`${color}`).toString({ format: 'hex' });

		return `<rect x="${x}" width="${rectWidth}" height="${rectHeight}" rx="6" fill="${colorHex}"/>`;
	});

	return `<svg width="${svgWidth}" height="${rectHeight}" viewBox="0 0 ${svgWidth} ${rectHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
${rects.join('\n')}
</svg>`;
}
