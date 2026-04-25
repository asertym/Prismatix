<script>
	import { Button } from '$components';
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
								onclick={() => copyValue(color)}
							></button>
						{/each}
					</div>
				</div>
			{/if}
			<div class="flex justify-end">
				<input
					bind:this={fileInputEl}
					type="file"
					accept="image/*"
					style="display: none"
					onchange={(e) => (currentFile = e.target.files[0])}
				/>
				<Button class="px-6 py-4" onclick={() => fileInputEl.click()}
					>{hasImage ? 'Change image' : 'Browse'}</Button
				>
			</div>
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
