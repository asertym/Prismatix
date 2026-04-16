<script>
	import { Hero } from '$modules';
	import { Input } from '$components';
	import { calcAPCA, fontLookupAPCA } from 'apca-w3';
	import { hexToRgb, luminance, PXtoPT } from '$lib/utils';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { onMount } from 'svelte';

	let textColor = $state('#112A46');
	let bgColor = $state('#ACC8E5');
	let contrastRatio = $state('');
	let fontArray = $state('');

	let wcagRatio = $derived(calcWCAG());
	let smallRatio = $derived(getWCAGlevel(20));
	let bigRatio = $derived(getWCAGlevel(32));

	let tipField;

	let failedMessage = 'X';

	function calcWCAG() {
		const text = hexToRgb(textColor);
		const bg = hexToRgb(bgColor);
		const l1 = luminance(text.r, text.g, text.b);
		const l2 = luminance(bg.r, bg.g, bg.b);
		const lighter = Math.max(l1, l2);
		const darker = Math.min(l1, l2);

		return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
	}

	function classRatio(input, low, medium, high) {
		if (input == high) return 'bg-green-200';
		if (input == medium) return 'bg-yellow-200';
		if (input == low) return 'bg-red-200';
		return 'bg-transparent';
	}

	function ratingRatio() {
		const input = wcagRatio;
		const breakpoints = { max: 12, high: 7, medium: 4.5, low: 3 };
		if (input >= breakpoints.max) return 'max';
		if (input >= breakpoints.high) return 'high';
		if (input >= breakpoints.medium) return 'medium';
		if (input >= breakpoints.low) return 'low';
		return '1';
	}

	function getWCAGlevel(fontSize) {
		const ratio = wcagRatio;
		const size = parseFloat(fontSize);
		const isLarge = size >= 24;
		if (isLarge) {
			if (ratio >= 4.5) return 'AAA';
			if (ratio >= 3) return 'AA';
			return 'Fail';
		} else {
			if (ratio >= 7) return 'AAA';
			if (ratio >= 4.5) return 'AA';
			return 'Fail';
		}
	}

	function calcContrast() {
		contrastRatio = calcAPCA(textColor, bgColor);
		fontArray = fontLookupAPCA(contrastRatio);

		document.documentElement.style.setProperty('--color-text', textColor);
		document.documentElement.style.setProperty('--color-bg', bgColor);
	}

	function returnSize(n) {
		if (fontArray[n] > 300) return failedMessage;
		return fontArray[n];
	}

	let tipsArray = [
		'For body text, try setting your line-height to roughly 1.5 times the font size. It prevents lines from blurring together and significantly improves reading comprehension.',
		' Stick to a maximum of two font families per project: one for headings and one for body text. Too many fonts create visual noise and increase page load times.',
		'Instead of #000000, try a very dark grey (like #1A1A1A). Pure black on a pure white background can cause "halation" that makes reading difficult for some users.',
		'Use font weight and scale, not just size, to show importance. A bold 16px header can often be more effective than a light 20px header.',
		'Use increments of 8 (8, 16, 24, 32...) for padding, margins, and sizing. It creates a mathematical rhythm that makes handoff to developers seamless and ensures a consistent UI.',
		'Don’t fear empty space. White space isn\'t "wasted" space; it is a functional element used to group related items and reduce cognitive load.',
		'Elements that are close together are perceived as related. Use spacing to visually "group" labels with their respective input fields to guide the user’s eye.',
		'Never use color as the only way to communicate meaning (e.g., a red border for an error). Always include an icon or text label for users with color blindness.',
		'Always run your text/background combinations through a WCAG contrast checker. Aim for a ratio of at least 4.5:1 for normal text to ensure accessibility.',
		'For a balanced color palette, use a primary color for 60% of the design, a secondary color for 30%, and an accent color for the final 10%.',
		'When designing dark mode, avoid pure black backgrounds. Use deep greys to allow for subtle shadows and depth, which are harder to see on true black.',
		"Users spend most of their time on other sites. This means they prefer your site to work the same way as all the others they know. Don't reinvent the wheel for standard navigation patterns.",
		'Whenever a user performs an action (like clicking a button), provide visual feedback—a loading spinner, a color change, or a toast notification. Never leave them wondering if the click "worked."',
		'Instead of a generic spinning loader, use skeleton screens (blank versions of the UI that are about to load). This reduces perceived wait time and makes the app feel faster.',
		'Try to not overwhelm users with too many choices at once. Use progressive disclosure and show only the information necessary for the current task.',
		'Users often scan web content in an F-shaped pattern (top horizontal, then a shorter horizontal, then vertical). Place your most important information along these paths.',
		'When designing layouts, think in terms of "rows" and "columns." This makes it much easier for developers to translate your static design into CSS Flexbox or Grid.',
		'Instead of sending random hex codes, provide a list of "Design Tokens" (e.g., color-primary, spacing-small, font-size-lg). This creates a shared language between design and code.',
		'A great designer doesn\'t just design the "perfect" state. Always design for the "empty state" (no data), the "error state," and the "loading state."',
		'Ensure all icons are designed on a consistent pixel grid (e.g., 24x24). This prevents blurry rendering and makes it much easier for developers to implement them as SVGs.'
	];

	function randomTip() {
		const random = Math.floor(Math.random() * tipsArray.length);
		// eslint-disable-next-line svelte/no-dom-manipulating
		tipField.innerHTML = tipsArray[random];
	}

	$effect(() => {
		if (textColor || bgColor) {
			calcContrast();
			calcWCAG();
		}
	});

	onMount(() => {
		randomTip();
	});
</script>

<div class="container mx-auto mb-24 space-y-12">
	<Hero
		title="Contrast Checker"
		description="Calculate the contrast ratio of text and background colours."
	></Hero>

	<div class="grid grid-cols-2 gap-6">
		<div class="grid grid-cols-2 gap-6 rounded-xl bg-stone-50 p-6 max-xl:col-span-2">
			<div class="flex flex-col max-xl:col-span-2">
				<div>
					<div class="ml-1 text-[10px] font-bold tracking-wider text-stone-500 uppercase">
						Text Colour
					</div>
					<div class="relative flex items-center">
						<div
							class="absolute right-3 z-10 size-6 rounded-lg"
							style={`background-color: ${textColor}`}
						>
							<ColorPicker
								bind:hex={textColor}
								isAlpha="false"
								sliderDirection="horizontal"
								position="responsive"
								label=""
							/>
						</div>
						<div class="w-full">
							<Input type="text" name="name" bind:value={textColor} class="w-full" />
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col max-xl:col-span-2">
				<div>
					<div class="ml-1 text-[10px] font-bold tracking-wider text-stone-500 uppercase">
						Background Colour
					</div>
					<div class="relative flex items-center">
						<div
							class="absolute right-3 z-10 size-6 rounded-lg"
							style={`background-color: ${bgColor}`}
						>
							<ColorPicker
								bind:hex={bgColor}
								isAlpha="false"
								sliderDirection="horizontal"
								position="responsive"
								label=""
							/>
						</div>
						<div class="w-full">
							<Input type="text" name="name" bind:value={bgColor} class="w-full" />
						</div>
					</div>
				</div>
			</div>
			<div class="col-span-2 space-y-2 max-xl:col-span-2">
				<div class="ml-1 text-[10px] font-bold tracking-wider text-stone-500 uppercase">
					WCAG Contrast
				</div>
				<div class="space-y-6">
					<div class="flex items-baseline space-x-6 rounded-lg bg-white p-6 text-5xl">
						<div>{wcagRatio}</div>

						{#if ratingRatio() == 'max'}
							<span class="flex items-center space-x-2 text-xl text-stone-800">
								<span class="inline-block size-2 rounded-full bg-green-500"></span>
								<span>Strong</span>
							</span>
						{:else if ratingRatio() == 'high'}
							<span class="flex items-center space-x-2 text-lg tracking-wide text-stone-800">
								<span class="inline-block size-2 rounded-full bg-green-500"></span>
								<span>Good</span>
							</span>
						{:else if ratingRatio() == 'medium'}
							<span class="flex items-center space-x-2 text-lg tracking-wide text-stone-800">
								<span class="inline-block size-2 rounded-full bg-yellow-500"></span>
								<span>Decent</span>
							</span>
						{:else if ratingRatio() == 'low'}
							<span class="flex items-center space-x-2 text-lg tracking-wide text-stone-800">
								<span class="inline-block size-2 rounded-full bg-rose-500"></span>
								<span>Bad</span>
							</span>
						{:else}
							<span class="flex items-center space-x-2 text-lg tracking-wide text-stone-800">
								<span class="inline-block size-2 rounded-full bg-red-500"></span>
								<span>Very Bad</span>
							</span>
						{/if}
					</div>
					<div class="grid grid-cols-2 gap-6">
						<div
							class={`rounded-lg p-6 transition-colors max-xl:col-span-2 ${classRatio(smallRatio, 'Fail', 'AA', 'AAA')}`}
						>
							Small text: {smallRatio}
						</div>
						<div
							class={`rounded-lg p-6 transition-colors max-xl:col-span-2 ${classRatio(bigRatio, 'Fail', 'AA', 'AAA')}`}
						>
							Large text: {bigRatio}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			class="flex flex-col items-center justify-center space-y-4 rounded-xl px-20 max-xl:col-span-2 max-xl:py-16"
			style="background-color: var(--color-bg);"
		>
			<div class="text-4xl" style="color: var(--color-text)">Did you know?</div>
			<div class="text-center" style="color: var(--color-text)" bind:this={tipField}></div>
		</div>
	</div>
	<div class="grid grid-cols-2 gap-6">
		<div class="table space-y-4 max-xl:col-span-2">
			<h2 class="text-2xl font-medium">APCA Accessibility</h2>
			<div class="flex gap-6">
				The table below outlines the minimum contrast thresholds required for legibility. Unlike
				traditional formulas, APCA accounts for the relationship between font size, weight, and
				perceived luminance to ensure text remains readable across different scales.
			</div>
			<div class="w-full overflow-hidden rounded-lg border border-stone-200">
				<table class="w-full text-sm">
					<thead>
						<tr class="">
							<th>Weight</th>
							<th>100</th>
							<th>200</th>
							<th>300</th>
							<th>400</th>
							<th>500</th>
							<th>600</th>
							<th>700</th>
							<th>800</th>
							<th>900</th>
						</tr></thead
					>
					<tbody>
						<tr>
							<td class="texborder-t-stone-700 bg-stone-100 font-medium">Size (px)</td>
							<td class="table-data">{returnSize(1)}</td>
							<td class="table-data">{returnSize(2)}</td>
							<td class="table-data">{returnSize(3)}</td>
							<td class="table-data">{returnSize(4)}</td>
							<td class="table-data">{returnSize(5)}</td>
							<td class="table-data">{returnSize(6)}</td>
							<td class="table-data">{returnSize(7)}</td>
							<td class="table-data">{returnSize(8)}</td>
							<td class="table-data">{returnSize(9)}</td>
						</tr>
						<tr>
							<td class="texborder-t-stone-700 bg-stone-100 font-medium">Size (pt)</td>
							<td class="table-data">{PXtoPT(returnSize(1), failedMessage)}</td>
							<td class="table-data">{PXtoPT(returnSize(2), failedMessage)}</td>
							<td class="table-data">{PXtoPT(returnSize(3), failedMessage)}</td>
							<td class="table-data">{PXtoPT(returnSize(4), failedMessage)}</td>
							<td class="table-data">{PXtoPT(returnSize(5), failedMessage)}</td>
							<td class="table-data">{PXtoPT(returnSize(6), failedMessage)}</td>
							<td class="table-data">{PXtoPT(returnSize(7), failedMessage)}</td>
							<td class="table-data">{PXtoPT(returnSize(8), failedMessage)}</td>
							<td class="table-data">{PXtoPT(returnSize(9), failedMessage)}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';
	:global(.color-picker) {
		position: absolute !important;
		z-index: 20;
	}
	table {
		@apply text-center;
	}
	thead {
		@apply bg-stone-100;
	}
	td,
	th {
		@apply p-4 max-xl:p-2;
	}
	th {
		@apply font-medium;
	}
	tr {
		@apply border-stone-200;
	}

	.table-data {
		@apply text-stone-950;
	}
</style>
