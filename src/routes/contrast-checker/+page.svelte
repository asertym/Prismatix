<script>
	import { Hero } from '$modules';
	import { ColorPicker } from '$components';
	import { calcAPCA, fontLookupAPCA } from 'apca-w3';
	import { hexToRgb, luminance, PXtoPT } from '$lib/utils';
	import { onMount } from 'svelte';
	let { data } = $props();

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

	function randomTip() {
		const random = Math.floor(Math.random() * data.tipsArray.length);
		// eslint-disable-next-line svelte/no-dom-manipulating
		tipField.innerHTML = data.tipsArray[random];
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

					<ColorPicker bind:color={textColor} />
				</div>
			</div>
			<div class="flex flex-col max-xl:col-span-2">
				<div>
					<div class="ml-1 text-[10px] font-bold tracking-wider text-stone-500 uppercase">
						Background Colour
					</div>
					<ColorPicker bind:color={bgColor} />
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
