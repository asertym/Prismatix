<script>
	import { getPalette } from 'tailwindcss-palette-generator/getPalette';
	import Color from 'colorjs.io';

	let color = $state('#10B981');
	let palette = $state({});

	let selectedColor = $derived(new Color(color).to('oklch'));

	function clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	function ease(t) {
		return Math.sign(t) * Math.pow(Math.abs(t), 0.8);
	}

	const SKY_L = {
		50: 0.9771,
		100: 0.9514,
		200: 0.9014,
		300: 0.8276,
		400: 0.7535,
		500: 0.6847,
		600: 0.5876,
		700: 0.5,
		800: 0.4434,
		900: 0.3912,
		950: 0.2935
	};

	const SKY_CHROMA_RATIO = {
		50: 0.084,
		100: 0.169,
		200: 0.375,
		300: 0.685,
		400: 0.94,
		500: 1,
		600: 0.94,
		700: 0.81,
		800: 0.67,
		900: 0.57,
		950: 0.43
	};

	const SKY_HUE_OFFSET = {
		50: -0.7,
		100: -0.5,
		200: -6.4,
		300: -7.0,
		400: -4.6,
		500: 0,
		600: 4.6,
		700: 5.4,
		800: 3.5,
		900: 3.6,
		950: 5.8
	};

	function generatePalette(l, c, h) {
		const ratio = l / SKY_L[500];
		const palette = {};

		for (const shade in SKY_L) {
			const newL = clamp(SKY_L[shade] * Math.pow(ratio, 0.9), 0.02, 0.98);

			const newC = clamp(c * SKY_CHROMA_RATIO[shade], 0.01, c * 1.05);

			const newH = h + SKY_HUE_OFFSET[shade];

			palette[shade] = `oklch(${newL} ${newC} ${newH})`;
		}

		return palette;
	}
	$effect(() => {
		palette = generatePalette(
			selectedColor.coords[0],
			selectedColor.coords[1],
			selectedColor.coords[2]
		);
		console.log(
			generatePalette(selectedColor.coords[0], selectedColor.coords[1], selectedColor.coords[2])
		);
	});

	$effect(() => {
		Object.entries(palette).forEach(([shade, color]) => {
			document.documentElement.style.setProperty(`--color-primary-${shade}`, color);
		});
	});
</script>

<div class="container mx-auto p-4">
	<div class="mb-8">
		<label for="color" class="mb-2 block text-sm font-medium">Select Color</label>
		<input type="color" name="color" id="color" bind:value={color} />
		<p class="mt-2 text-sm text-gray-600">Selected color: {selectedColor}</p>
	</div>

	<div class="flex">
		{#each Object.entries(palette) as [shade, color]}
			<div class="p-6" style={`background-color: var(--color-primary-${shade})`}>{shade}</div>
		{/each}
	</div>
	<div class="flex">
		<div class="bg-emerald-50 p-6">50</div>
		<div class="bg-emerald-100 p-6">100</div>
		<div class="bg-emerald-200 p-6">200</div>
		<div class="bg-emerald-300 p-6">300</div>
		<div class="bg-emerald-400 p-6">400</div>
		<div class="bg-emerald-500 p-6">500</div>
		<div class="bg-emerald-600 p-6">600</div>
		<div class="bg-emerald-700 p-6">700</div>
		<div class="bg-emerald-800 p-6">800</div>
		<div class="bg-emerald-900 p-6">900</div>
		<div class="bg-emerald-950 p-6">950</div>
	</div>
</div>
