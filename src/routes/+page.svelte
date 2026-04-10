<script>
	import { Input, Button, Icon } from '$components';
	import { Bentos, Quote, Stats, Works, Pricing } from '$modules';
	import configRender from '$lib/exportRender';
	import { generateColor } from '$lib/genPalette';
	import { copyRender, copyFigma, nameThatColor, tweakColor } from '$lib/utils';
	import Color from 'colorjs.io';
	import { SvelteURLSearchParams } from 'svelte/reactivity';

	let color = $state('#4F6814'); // default selected color
	let c = $derived(new Color(color));
	let colorName = $derived(nameThatColor(color));
	let preserve = $state(true); // preserve input shade
	let palette = $derived.by(() => {
		// Only compute palette in browser environment
		if (typeof document === 'undefined') {
			return {};
		}
		return generateColor(tweakColor(c, nudgeH, nudgeS), preserve, shades, outputValue);
	}); // object declaration
	// let exportName = $state('primary'); //export name
	let copy = $state(false); // is shade copied?

	let themeRender = $state(); // bind for component

	let renderType = $state('tw4'); // default value selected
	let outputValue = $state('oklch'); // default value selected

	let shades = [
		{ name: '50', lightness: '95' },
		{ name: '100', lightness: '90' },
		{ name: '200', lightness: '80' },
		{ name: '300', lightness: '70' },
		{ name: '400', lightness: '60' },
		{ name: '500', lightness: '50' },
		{ name: '600', lightness: '40' },
		{ name: '700', lightness: '30' },
		{ name: '800', lightness: '20' },
		{ name: '900', lightness: '10' },
		{ name: '950', lightness: '5' }
	];

	// Initialize with default color values
	const defaultColor = new Color('#4F6814');
	let baseH = $derived(c.hsl.h),
		baseS = $derived(c.hsl.s),
		nudgeH = $state(defaultColor.hsl.h),
		nudgeS = $state(defaultColor.hsl.s);

	function initParams() {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);

			// Extract color from URL
			const urlColor = params.get('color');
			if (urlColor) {
				try {
					// Validate it's a valid color
					new Color(urlColor);
					color = urlColor;
				} catch {
					console.warn('Invalid color in URL:', urlColor);
				}
			}

			// Extract hue and saturation from URL
			const urlHue = params.get('hue');
			const urlSat = params.get('saturation');

			if (urlHue !== null) {
				nudgeH = parseFloat(urlHue);
			}
			if (urlSat !== null) {
				nudgeS = parseFloat(urlSat);
			}

			// Extract output format from URL
			const urlFormat = params.get('format');
			if (urlFormat && ['oklch', 'hsl', 'hex'].includes(urlFormat)) {
				outputValue = urlFormat;
			}
		}
	}

	// Update URL when palette values change
	function updateShareUrl() {
		if (typeof window !== 'undefined') {
			const params = new SvelteURLSearchParams();
			params.set('color', color);
			params.set('hue', Math.round(nudgeH.toString()));
			params.set('saturation', Math.round(nudgeS.toString()));
			params.set('format', outputValue);

			const newUrl = `${window.location.pathname}?${params.toString()}`;
			window.history.replaceState({}, '', newUrl);
		}
	}

	let showSettings = $state(false);
	let showExport = $state(false);

	function randomColor() {
		const hue = Math.random() * 360;
		const sat = 15 + Math.random() * 85;
		const lig = 20 + Math.random() * 80;

		color = new Color(`hsl(${hue}, ${sat}%, ${lig}%)`).toString({ format: 'hex' });

		resetConfig(hue, sat);
		updateShareUrl();
	}

	function resetConfig(hue, sat) {
		nudgeH = hue;
		nudgeS = sat;
	}

	function newInput() {
		resetConfig(baseH, baseS);
		updateShareUrl();
	}

	function handlePaste(e) {
		e.preventDefault();
		let pastedText = e.clipboardData.getData('text').trim();
		if (
			pastedText &&
			!pastedText.startsWith('#') &&
			/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(pastedText)
		) {
			pastedText = `#${pastedText}`;
		}
		color = pastedText;
	}

	function revertHue() {
		nudgeH = baseH;
		updateShareUrl();
	}

	function revertSat() {
		nudgeS = baseS;
		updateShareUrl();
	}

	$effect(() => {
		initParams();
	});
</script>

<div class="container mx-auto space-y-12 p-4">
	<div class="my-24 space-y-4">
		<h1 class="text-7xl font-bold tracking-tight">Palette generator</h1>
		<h2 class="text-xl text-stone-700">Create, preview, and export your CSS palette</h2>
	</div>

	<!-- Palette showcase -->
	<div class="mb-36">
		<div class="mb-2 flex items-center justify-between">
			<div>
				Palette 1 <span class="capitalize">({colorName})</span>
			</div>
			<div class="mx-2 flex items-center justify-center">
				<Input
					type="radio"
					bind:family={outputValue}
					onchange={updateShareUrl}
					options={[
						{ label: 'OKLCH', value: 'oklch' },
						{ label: 'HSL', value: 'hsl' },
						{ label: 'HEX', value: 'hex' }
					]}
				/>
			</div>
		</div>

		<div class="flex space-x-3 overflow-hidden">
			{#each Object.entries(palette) as [shade, color] (shade)}
				<div class="flex h-32 w-full flex-col items-center">
					<div
						class="atlas flex h-full w-full cursor-pointer items-center justify-center rounded-lg transition-colors"
						style="--background: var(--color-primary-{shade})"
						onclick={() => {
							navigator.clipboard.writeText(color);
							copy = true;
						}}
						onmouseout={() => (copy = false)}
						onblur={() => (copy = false)}
						role="presentation"
					>
						{#if !copy}
							<Icon name="clipboard" size="24px" />
						{:else}
							Copied!
						{/if}
					</div>
					<div class="mt-2">
						{shade}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Components -->
	<div class="mb-36">
		<div class="space-y-36">
			<!-- Components here -->
			<Works />
			<Stats />
			<Bentos />
			<Quote />
			<Pricing />
		</div>
	</div>
</div>

<!-- Sticky bottom container -->
<div
	class="box box-sm pointer-events-none fixed right-0 bottom-4 left-0 z-20 container mx-auto flex items-center justify-between rounded-xl border border-stone-200 bg-white/75 px-4 py-3 backdrop-blur-lg"
>
	<!-- Color input -->
	<div class="relative flex items-center">
		<div class="absolute left-2 z-10 inline-block h-8 w-8 overflow-hidden">
			<input
				class="pointer-events-auto cursor-pointer opacity-0"
				type="color"
				bind:value={color}
				onchange={newInput}
			/>
			<div
				class="absolute inset-0 -z-10 h-8 w-8 rounded-lg"
				style={`background-color: ${color}`}
			></div>
		</div>
		<Input
			type="text"
			class="pointer-events-auto w-48 text-center"
			bind:value={color}
			onpaste={handlePaste}
			onchange={updateShareUrl}
		/>
	</div>
	<div>
		<div class="space-x-2">
			<Button
				class="pointer-events-auto rounded px-4 py-4"
				onclick={randomColor}
				icon={{ name: 'dice', size: '20px' }}
			/>
			<Button
				class="pointer-events-auto rounded px-4 py-4"
				onclick={() => (showSettings = !showSettings)}
				icon={{ name: 'sliders', size: '20px' }}
			/>
			<Button
				class="pointer-events-auto rounded px-4 py-4"
				color="primary"
				onclick={() => (showExport = !showExport)}
				icon={{ name: 'export', size: '20px' }}
			/>
		</div>
		<!-- Settings tooltip -->
		{#if showSettings}
			<div
				class="pointer-events-auto fixed right-16 bottom-20 z-60 w-72 transform rounded-xl border border-stone-200 bg-white p-4 shadow-xl backdrop-blur-md"
			>
				<div class="flex flex-col space-y-4">
					<div class="space-y-1">
						<span class="ml-1 text-[10px] font-bold tracking-wider text-stone-400 uppercase"
							>Name</span
						>
						<Input type="text" name="name" placeholder="name" bind:value={colorName} class="h-9" />
					</div>

					<div class="space-y-1">
						<div class="flex h-4 items-center justify-between px-1">
							<span class="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
								Hue
								{#if nudgeH !== baseH}
									<button
										class="ml-2 cursor-pointer rounded-sm border border-stone-400 px-1"
										onclick={revertHue}>Revert</button
									>
								{/if}
							</span>
							<span class="font-mono text-[10px] text-stone-500">{Math.round(nudgeH)}&deg;</span>
						</div>
						<input
							type="range"
							min="0"
							max="360"
							bind:value={nudgeH}
							onchange={updateShareUrl}
							class="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-stone-800"
						/>
					</div>

					<div class="space-y-1">
						<div class="flex h-4 items-center justify-between px-1">
							<span class="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
								Saturation
								{#if nudgeS !== baseS}
									<button
										class="ml-2 cursor-pointer rounded-sm border border-stone-400 px-1"
										onclick={revertSat}>Revert</button
									>
								{/if}
							</span>
							<span class="font-mono text-[10px] text-stone-500">{Math.round(nudgeS)}%</span>
						</div>
						<input
							type="range"
							min="0"
							max="100"
							bind:value={nudgeS}
							onchange={updateShareUrl}
							class="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-stone-800"
						/>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

{#if showSettings}
	<div
		class="fixed inset-0 z-10"
		onclick={() => (showSettings = !showSettings)}
		role="presentation"
	></div>
{/if}

<!-- Export modal -->
{#if showExport}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<!-- Outer -->
		<div
			class="absolute inset-0 z-10 bg-stone-950/25"
			onclick={() => (showExport = false)}
			role="presentation"
		></div>

		<div class="z-20 mx-4 w-xl rounded-lg bg-white p-4">
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-lg font-semibold">Export</h3>
				<Button
					class="px-2 py-2"
					onclick={() => (showExport = false)}
					icon={{ name: 'cross', size: '20px' }}
				></Button>
			</div>
			<div class="space-y-4">
				<div class="flex justify-between">
					<Input
						type="radio"
						bind:family={outputValue}
						onchange={updateShareUrl}
						options={[
							{ label: 'OKLCH', value: 'oklch' },
							{ label: 'HSL', value: 'hsl' },
							{ label: 'HEX', value: 'hex' }
						]}
					/>
					<Button class="px-4" onclick={copyFigma(palette)}>Copy Figma</Button>
				</div>

				<div>
					<Input
						type="radio"
						bind:family={renderType}
						options={[
							{ label: 'Tailwind 4', value: 'tw4' },
							{ label: 'Tailwind 3', value: 'tw3' },
							{ label: 'Vanilla CSS', value: 'css' }
						]}
					/>
				</div>
				<div class="relative w-full rounded-lg bg-stone-800 px-5 pt-8 pb-5 font-mono text-stone-50">
					<button
						class="absolute top-3 right-5 text-green-500"
						onclick={copyRender(themeRender.textContent)}
					>
						Copy
					</button>
					<div bind:this={themeRender}>
						<pre>{configRender(renderType, palette, colorName)}</pre>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.atlas {
		background: var(--background);
		color: transparent;
	}
	.atlas:hover {
		color: oklch(from var(--background) round(1.21 - L) 0 0);
	}
</style>
