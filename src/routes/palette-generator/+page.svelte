<script>
	import { Input, Button, Icon, InView } from '$components';
	import { Bentos, Quote, Hero, Stats, Works, Pricing } from '$modules';
	import configRender from '$lib/exportRender';
	import { generateColor } from '$lib/genPalette';
	import { copyRender, copyFigma, nameThatColor, tweakColor } from '$lib/utils';
	import Color from 'colorjs.io';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { onMount } from 'svelte';
	import { replaceState } from '$app/navigation';

	// --- Constants ---
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

	// --- Core Color State ---
	let color = $state('#4F6814');
	let c = $derived(new Color(color));
	let newInput = $state('');
	let colorName = $derived(nameThatColor(color));
	let preserve = $state(true);
	let baseH = $derived(c.hsl.h);
	let baseS = $derived(c.hsl.s);

	// --- Config State ---
	let renderType = $state('tw4');
	let outputValue = $state('oklch');
	let nudgeH = $derived(baseH);
	let nudgeS = $derived(baseS);

	// --- UI Related ---
	let copy = $state(false);
	let themeRender = $state();
	let showSettings = $state(false);
	let showExport = $state(false);

	let palette = $derived.by(() => {
		if (typeof document === 'undefined') {
			return {};
		}
		return generateColor(tweakColor(c, nudgeH, nudgeS), preserve, shades, outputValue);
	});

	function initParams() {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);

			// Color
			const urlColor = params.get('color');
			if (urlColor) {
				try {
					new Color(urlColor); // for validation
					color = urlColor;
				} catch {
					console.warn('Invalid color in URL:', urlColor);
				}
			}

			// Config
			const urlHue = params.get('hue');
			const urlSat = params.get('saturation');

			if (urlHue !== null) {
				nudgeH = parseFloat(urlHue);
			}
			if (urlSat !== null) {
				nudgeS = parseFloat(urlSat);
			}

			// Format
			const urlFormat = params.get('format');
			if (urlFormat && ['oklch', 'hsl', 'hex'].includes(urlFormat)) {
				outputValue = urlFormat;
			}
		}
	}

	function randomColor() {
		const hue = Math.random() * 360;
		const sat = 15 + Math.random() * 85;
		const lig = 20 + Math.random() * 80;

		newInput = new Color(`hsl(${hue}, ${sat}%, ${lig}%)`).toString({ format: 'hex' });

		resetConfig();
	}

	function resetConfig(which) {
		if (which == 'hue') {
			nudgeH = baseH;
		} else if (which == 'sat') {
			nudgeS = baseS;
		} else {
			nudgeH = baseH;
			nudgeS = baseS;
		}
	}

	$effect(() => {
		if (newInput) {
			const params = new SvelteURLSearchParams();
			params.set('color', color);
			params.set('hue', Math.round(nudgeH).toString());
			params.set('saturation', Math.round(nudgeS).toString());
			params.set('format', outputValue);

			const newUrl = `?${params.toString()}`;
			if (window.location.search !== `?${params.toString()}`) {
				replaceState(newUrl, {});
			}
		}
	});

	onMount(() => {
		initParams();
	});

	$effect(() => {
		if (newInput) {
			color = newInput;
			resetConfig();
			document.documentElement.style.setProperty(
				`--input-color`,
				c.to('hsl').set('s', 100).set('l', 50).toString({ format: 'hex' })
			);
		}
	});
</script>

<div class="relative container mx-auto space-y-12">
	<Hero title="Palette generator" description="Create, preview, and export your CSS palette"></Hero>

	<!-- Palette showcase -->
	<div class="mb-36 max-xl:mb-24">
		<div class="mb-2 flex items-center justify-between">
			<div>
				Palette 1 <span class="capitalize">({colorName})</span>
			</div>
			<div class="mx-2 flex items-center justify-center">
				<Input
					type="radio"
					bind:family={outputValue}
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
							<Icon name="clipboard" />
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
	<div>
		<div class="space-y-36">
			<!-- Components here -->
			<InView animation="slide-up"><Works /></InView>
			<InView animation="slide-up"><Stats /></InView>
			<InView animation="slide-up"><Bentos /></InView>
			<InView animation="slide-up"><Quote /></InView>
			<InView animation="slide-up"><Pricing /></InView>
		</div>
	</div>

	<!-- Sticky bottom container -->
	<div
		class="box box-sm pointer-events-none sticky right-0 bottom-4 left-0 z-20 container mx-auto flex items-stretch justify-between rounded-xl border border-zinc-200 bg-white px-6 py-5"
	>
		<!-- Color input -->
		<div class="pointer-events-auto flex items-center">
			<div
				class="group relative flex h-full w-54 items-center rounded-lg"
				style={`background-color: ${color}`}
			>
				<div
					class="picker-label w-full text-center opacity-0 transition-opacity duration-150 group-hover:opacity-100"
					style={`--background: ${color}`}
				>
					{color}
				</div>
				<div class="absolute inset-0 z-10 inline-block">
					<ColorPicker
						bind:hex={newInput}
						isAlpha={false}
						position="responsive"
						sliderDirection="horizontal"
						label=""
					/>
				</div>
			</div>
		</div>
		<div>
			<div class="space-x-2">
				<Button
					class="pointer-events-auto rounded px-4 py-4"
					color="responsive"
					onclick={randomColor}
					icon={{ name: 'dice', size: '20px' }}
				/>
				<Button
					class="pointer-events-auto rounded px-4 py-4"
					color="responsive"
					onclick={() => (showSettings = !showSettings)}
					icon={{ name: 'sliders', size: '20px' }}
				/>
				<Button
					class="pointer-events-auto rounded px-4 py-4"
					color="responsive"
					onclick={() => (showExport = !showExport)}
					icon={{ name: 'export', size: '20px' }}
				/>
			</div>
			<!-- Settings tooltip -->
			{#if showSettings}
				<div
					class="pointer-events-auto absolute right-16 bottom-20 z-60 w-72 transform rounded-xl border border-zinc-200 bg-white p-4 shadow-xl backdrop-blur-md"
				>
					<div class="flex flex-col space-y-4">
						<div class="space-y-1">
							<span class="ml-1 text-[10px] font-bold tracking-wider text-zinc-500 uppercase"
								>Name</span
							>
							<Input type="text" name="name" placeholder="name" bind:value={colorName} class="" />
						</div>

						<div class="space-y-1">
							<div class="flex h-4 items-center justify-between px-1">
								<span class="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
									Hue
									{#if nudgeH !== baseH}
										<button
											class="ml-2 cursor-pointer rounded-sm border border-zinc-500 px-1"
											onclick={() => {
												resetConfig('hue');
											}}>Revert</button
										>
									{/if}
								</span>
								<span class="font-mono text-[10px] text-zinc-500">{Math.round(nudgeH)}&deg;</span>
							</div>
							<input
								type="range"
								min="0"
								max="360"
								bind:value={nudgeH}
								class="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-zinc-800"
							/>
						</div>

						<div class="space-y-1">
							<div class="flex h-4 items-center justify-between px-1">
								<span class="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
									Saturation
									{#if nudgeS !== baseS}
										<button
											class="ml-2 cursor-pointer rounded-sm border border-zinc-500 px-1"
											onclick={() => {
												resetConfig('sat');
											}}>Revert</button
										>
									{/if}
								</span>
								<span class="font-mono text-[10px] text-zinc-500">{Math.round(nudgeS)}%</span>
							</div>
							<input
								type="range"
								min="0"
								max="100"
								bind:value={nudgeS}
								class="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-zinc-800"
							/>
						</div>
					</div>
				</div>
			{/if}
		</div>
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
			class="absolute inset-0 z-10 bg-zinc-950/25"
			onclick={() => (showExport = false)}
			role="presentation"
		></div>

		<div class="z-20 mx-4 w-xl rounded-lg bg-white p-4">
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-lg font-semibold">Export</h3>
				<Button
					color="clear"
					onclick={() => (showExport = false)}
					icon={{ name: 'cross', size: '20px' }}
				></Button>
			</div>
			<div class="space-y-4">
				<div class="flex justify-between">
					<Input
						type="radio"
						bind:family={outputValue}
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
				<div class="relative w-full rounded-lg bg-zinc-800 px-5 pt-8 pb-5 font-mono text-zinc-50">
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
	.atlas:hover,
	.picker-label {
		color: oklch(from var(--background) round(1.21 - L) 0 0);
	}
</style>
