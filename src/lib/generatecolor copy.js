import Color from 'colorjs.io';

export const generateColor = (hex, preserve, shades) => {
	const baseColor = new Color(hex);
	let baseH, baseS, baseL;
	baseH = baseColor.hsl.h;
	baseS = baseColor.hsl.s;
	baseL = baseColor.hsl.l;

	const lightnessDelta = {};

	function polyStep(array, min, maxLeft, minRight, currentStep, exponent) {
		const totalPoints = array.length;
		const mid = (totalPoints - 1) / 2;

		let t;

		if (currentStep <= mid) {
			t = currentStep / mid;
			console.log(`light ${t}`);
			return min + (maxLeft - min) * Math.pow(t, exponent);
		} else {
			t = (currentStep - mid) / mid;
			console.log(`dark ${t}`);
			return maxLeft + (minRight - maxLeft) * Math.pow(t, exponent);
		}
	}

	// create object
	const obj = shades.reduce((obj, { name }, index) => {
		// Ease value
		const easedL = polyStep(shades, 80, baseL, 10, index, 2);
		// const easedC = polyStep(shades, baseC, baseC * 0.3, index, 2);

		const newColor = new Color(`hsl(${baseH} ${baseS} ${easedL})`);

		// update map
		obj[name] = newColor.toString({ format: 'hsl' });

		// update lightnessDelta if preserving color
		if (preserve) lightnessDelta[name] = Math.abs(baseL - easedL);

		Object.entries(obj).forEach(([shade, color]) => {
			document.documentElement.style.setProperty(`--color-primary-${shade}`, color);
		});

		console.log(easedL);
		// console.log(index);
		// console.log(adjusted);

		return obj;
	}, {});

	// if preserving color, inject original color at closest shade
	if (preserve) {
		const [closestShade] = Object.keys(lightnessDelta).sort(
			(a, b) => lightnessDelta[a] - lightnessDelta[b]
		);
		obj[closestShade] = baseColor.toString({ format: 'hsl' });
	}

	return obj;
};
