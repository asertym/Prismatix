import Color from 'colorjs.io';

export const generateColor = (input, preserve, shades, format) => {
	const baseColor = new Color(input);
	let baseH, baseS, baseL;
	baseH = baseColor.hsl.h;
	baseS = baseColor.hsl.s;
	baseL = baseColor.hsl.l;

	const closest = [];

	const lightnessDelta = [];
	let difference = 0;

	// Check if input is grayscale (saturation is zero or near-zero)
	const isGrayscale = baseS < 1;

	shades.reduce((obj, { name, lightness }) => {
		if (preserve) {
			lightnessDelta.push({ name, difference: Math.abs(baseL - lightness) });
			lightnessDelta.sort((a, b) => a.difference - b.difference);
			difference = lightnessDelta[0]?.difference;
		}
	});

	const obj = shades.reduce((obj, { name, lightness }) => {
		let adjustedL = Number(lightness) + Number(difference % 1);

		// For grayscale, create neutral gray; otherwise use original hue/saturation
		const newColor = isGrayscale
			? new Color(`hsl(0 0 ${adjustedL})`)
			: new Color(`hsl(${baseH} ${baseS} ${adjustedL})`);

		obj[name] = newColor.toString({ format });

		if (preserve) closest[name] = Math.abs(baseL - lightness);

		Object.entries(obj).forEach(([shade, color]) => {
			document.documentElement.style.setProperty(`--color-primary-${shade}`, color);
		});
		return obj;
	}, {});

	// if preserving color, inject original color at closest shade
	if (preserve) {
		const [closestShade] = Object.keys(closest).sort((a, b) => closest[a] - closest[b]);
		obj[closestShade] = baseColor.toString({ format });
	}

	return obj;
};
