<script>
	import { Button, Tip } from '$components';
	import { copyValue } from '$lib/utils';
	import { ImagePicker, Hero } from '$modules';
	import { getPaletteSync, getSwatchesSync } from 'colorthief';
	import { slide } from 'svelte/transition';

	let pickedColors = $state([]);
	let colorProportions = $state([]);

	let canvasEl = $state(null);
	let fileInputEl = $state(null);
	let hasImage = $state(false);
	let currentFile = $state(null);
	let swatches = $state({});

	const SWATCH_TYPES = [
		'Vibrant',
		'Muted',
		'DarkVibrant',
		'DarkMuted',
		'LightVibrant',
		'LightMuted'
	];

	function extractPalette() {
		if (!canvasEl || !hasImage) return;
		const palette = getPaletteSync(canvasEl, { colorCount: 6 });
		colorProportions = palette.map((color) => ({
			id: colorProportions.length++,
			hex: color.hex(),
			percentage: Math.round(color.proportion * 100)
		}));

		swatches = getSwatchesSync(canvasEl);
	}

	const hasAnySwatch = $derived(SWATCH_TYPES.some((type) => swatches[type]));
</script>

<div class="container mx-auto mb-32">
	<Hero title="Image Picker" description="Find the perfect colors in your images"></Hero>
	<div class="grid grid-cols-12 gap-6">
		<!-- Left Side -->
		<div class="col-span-6 space-y-6">
			<!-- Semantic Swatches -->
			{#if hasAnySwatch}
				<div class="rounded-lg bg-stone-50 p-6" in:slide>
					<h3 class="mb-4 text-lg font-semibold">Semantic Swatches</h3>
					<div class="grid grid-cols-4 gap-4">
						{#each SWATCH_TYPES as type (type)}
							{#if swatches[type]}
								<div
									class="flex w-full flex-col space-y-4 rounded-lg p-4"
									style={`background: ${swatches[type].color.hex()}`}
								>
									<h4
										class="swatch-title text-sm font-medium tracking-wide uppercase"
										style={`color: ${swatches[type].titleTextColor.hex()}`}
									>
										{swatches[type].color.hex()}
									</h4>
									<p class="text-xs" style={`color: ${swatches[type].bodyTextColor.hex()}`}>
										{type}
									</p>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
			{#if pickedColors.length > 0}
				<div class="rounded-lg bg-stone-50 p-6" in:slide>
					<h3 class="mb-4 text-lg font-semibold">Selection History</h3>
					<!-- Color History -->
					<div class="history">
						{#each pickedColors as color, i (i)}
							<button
								type="button"
								class="size-10 cursor-pointer rounded-lg shadow"
								style="background: {color}"
								aria-label="Copy {color} to clipboard"
								title={color}
								onclick={() => copyValue(color)}>{color}</button
							>
						{/each}
					</div>
				</div>
			{/if}
			<input
				bind:this={fileInputEl}
				type="file"
				accept="image/*"
				style="display: none"
				onchange={(e) => (currentFile = e.target.files[0])}
			/>
			{#if hasImage}
				<div class="flex justify-end" in:slide>
					<Button class="px-6 py-4" onclick={() => fileInputEl.click()}
						>{hasImage ? 'Change image' : 'Browse'}</Button
					>
				</div>
			{/if}
			<!-- Getting Started -->
			<div class="prose max-w-full">
				{#if !hasImage}
					<h2>Getting Started</h2>
				{/if}
				<p>
					Perform deep compositional analysis on any image to extract intelligent, semantic color
					palettes.
				</p>
				<ul>
					<li>
						<b>Color Analysis</b>: Automated extraction of dominant hues and their relative
						proportional weights within the image.
					</li>
					<li>
						<b>Semantic Swatches</b>: Colors categorized into functional roles, complete with
						accessibility-optimized text recommendations.
					</li>
					<li>
						<b>Manual Sampling</b>: Precise, pixel-level color picking by clicking anywhere on the
						active image.
					</li>
				</ul>
				<p>To get started, click to browse or drag & drop an image into the image field.</p>
			</div>
			{#if !hasImage}
				<Tip
					><b>Quick Copy</b>: Click any sampled color or swatch to instantly copy its value to your
					clipboard. (works with color proportions as well)</Tip
				>
				<Tip
					><b>Picker History</b>: Your manual picks are automatically saved in the picker history
					for easy retrieval.</Tip
				>
			{/if}

			<p>
				Prismatix operates on a privacy-first, client-side architecture. All image processing and
				mathematical analysis occur locally in your browser. No data or imagery is ever transmitted
				to a server, providing a secure and transparent environment for your design work.
			</p>
		</div>
		<!-- Right Side -->
		<div class="col-span-6 space-y-6">
			<div class="">
				<ImagePicker
					onpick={(hex) => (pickedColors = [hex, ...pickedColors])}
					bind:hasImage
					bind:canvasEl
					file={currentFile}
					onbrowse={() => fileInputEl.click()}
					onload={extractPalette}
				/>
			</div>
			{#if hasImage && colorProportions.length > 0}
				<div class="color-proportions-bar flex h-10 overflow-hidden rounded-lg shadow-lg" in:slide>
					{#each colorProportions as color (color.id)}
						<div
							class="color-swatch group relative flex min-w-4 shrink grow cursor-pointer items-center justify-center overflow-hidden transition-all duration-300 hover:min-w-36"
							style={`--background: ${color.hex}; background-color: var(--background); width: clamp(1%, ${color.percentage}%, 100%)`}
							title={color.hex}
							onclick={() => copyValue(color.hex)}
							role="button"
							tabindex="0"
							onkeydown={() => copyValue(color.hex)}
						>
							<span
								class="swap-text font-mono text-nowrap opacity-0 transition duration-300 group-hover:opacity-100"
							>
								{color.percentage < 1 ? '<1' : color.percentage}%: {color.hex}</span
							>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.history {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 1rem;
	}
</style>
