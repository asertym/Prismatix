import Color from 'colorjs.io';

export const generateColor = (input, preserve, shades, format) => {
	const baseColor = new Color(input);
	let baseH, baseS, baseL;
	baseH = baseColor.hsl.h;
	baseS = baseColor.hsl.s;
	baseL = baseColor.hsl.l;

	const lightnessDelta = [];
	let difference = 0;

	shades.reduce((obj, { name, lightness }) => {
		if (preserve) {
			lightnessDelta.push({ name, difference: Math.abs(baseL - lightness) });
			lightnessDelta.sort((a, b) => a.difference - b.difference);
			difference = lightnessDelta[0]?.difference;
		}
	});

	const obj = shades.reduce((obj, { name, lightness }) => {
		let adjustedL = Number(lightness) + Number(difference);
		const newColor = new Color(`hsl(${baseH} ${baseS} ${adjustedL})`);
		console.log(adjustedL);
		obj[name] = newColor.toString({ format });
		Object.entries(obj).forEach(([shade, color]) => {
			document.documentElement.style.setProperty(`--color-primary-${shade}`, color);
		});
		return obj;
	}, {});

	return obj;
};
