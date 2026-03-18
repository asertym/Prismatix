import Color from 'colorjs.io';

export const generateColor = (input, preserve, shades, format) => {
	const baseColor = new Color(input);
	let baseH, baseS, baseL;
	baseH = baseColor.hsl.h;
	baseS = baseColor.hsl.s;
	baseL = baseColor.hsl.l;

	const lightnessDelta = {};

	const obj = shades.reduce((obj, { name, lightness }) => {
		const newColor = new Color(`hsl(${baseH} ${baseS} ${lightness})`);

		obj[name] = newColor.toString({ format });

		if (preserve) lightnessDelta[name] = Math.abs(baseL - lightness);

		Object.entries(obj).forEach(([shade, color]) => {
			document.documentElement.style.setProperty(`--color-primary-${shade}`, color);
		});

		return obj;
	}, {});

	// if preserving color, inject original color at closest shade
	if (preserve) {
		const [closestShade] = Object.keys(lightnessDelta).sort(
			(a, b) => lightnessDelta[a] - lightnessDelta[b]
		);
		obj[closestShade] = baseColor.toString({ format });
	}

	return obj;
};
