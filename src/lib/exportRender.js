export default function configRender(type, object, name) {
	name = name.toLowerCase().replace(' ', '-');
	if (type == 'tw4') {
		return [
			`@theme {`,
			...Object.entries(object).map(
				([shade, value]) => `  --color-${name !== '' ? `${name}-` : ''}${shade}: ${value};`
			),
			`}`
		].join('\n');
	} else if (type == 'tw3') {
		return [
			`theme: {`,
			`  colors: {`,
			`    "${name}": {`,
			...Object.entries(object).map(([shade, value]) => `      ${shade}: "${value}",`),
			`    }`,
			`  }`,
			`}`
		].join('\n');
	} else {
		return [
			`:root {`,
			...Object.entries(object).map(([shade, value]) => `  --color-${name}-${shade}: ${value};`),
			`}`
		].join('\n');
	}
}
