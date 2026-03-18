<script>
	import { Input, Button } from '$components';
	import Icon from '$components/icon.svelte';
	import configRender from '$lib/configRender';
	import { generateColor } from '$lib/generatecolor';
	import genSVGPalette from '$lib/genSVGPalette';
	import Color from 'colorjs.io';

	let color = $state('#F43F5E'); // default selected color
	let colorTweaked = $derived(tweakColor(color, nudgeH, nudgeS));
	let preserve = $state(true);
	let palette = $derived({}); // array declaration
	let colorName = $state('primary'); //default name
	let copy = $state(false);

	let themeRender = $state(); // bind for component
	let renderType = $state('tw4'); // default value selected
	let outputValue = $state('oklch'); // default value selected

	let shades = [
		{ name: '50', lightness: '95.1' },
		{ name: '100', lightness: '90' },
		{ name: '200', lightness: '80' },
		{ name: '300', lightness: '70' },
		{ name: '400', lightness: '60' },
		{ name: '500', lightness: '50' },
		{ name: '600', lightness: '40' },
		{ name: '700', lightness: '30' },
		{ name: '800', lightness: '20' },
		{ name: '900', lightness: '10' },
		{ name: '950', lightness: '7.1' }
	];

	let nudgeH = $state(0),
		nudgeS = $state(0);

	let showSettings = $state(false);
	let showExport = $state(false);

	function tweakColor(color, nudgeH, nudgeS) {
		let tweaked = new Color(color);
		tweaked.hsl.h += nudgeH;
		tweaked.hsl.s += nudgeS;

		return tweaked;
	}

	// Copy generated code
	function copyRender() {
		navigator.clipboard.writeText(themeRender.textContent);
	}

	function randomColor() {
		const hue = Math.random() * 360;
		const sat = 15 + Math.random() * 85;
		const lig = 20 + Math.random() * 80;

		color = new Color(`hsl(${hue}, ${sat}%, ${lig}%)`).toString({ format: 'hex' });
	}

	function copyFigma() {
		let source = genSVGPalette(palette);
		navigator.clipboard.writeText(source);
	}

	$effect(() => {
		palette = generateColor(colorTweaked, preserve, shades, outputValue);
	});
</script>

<div class="container mx-auto space-y-12 p-4">
	<div class="my-24 space-y-4">
		<h1 class="text-7xl font-bold tracking-tight">Palette generator</h1>
		<h2 class="text-xl text-stone-700">Create, preview, and export your CSS palette</h2>
	</div>

	<!-- Palette showcase -->
	<div>
		<div class="mb-2 flex items-center justify-between">
			<div>Palette 1</div>
			<div class="mx-2 flex items-center justify-center space-x-12">
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
	<div>
		<div class="text-lg">Examples</div>
		<div>
			<!-- Components here -->
		</div>
	</div>
</div>

<!-- Sticky bottom container -->
<div
	class="box box-sm fixed right-0 bottom-4 left-0 container mx-auto flex items-center justify-between rounded-xl border border-stone-100 bg-white px-4 py-2"
>
	<!-- Color input -->
	<div class="relative flex items-center">
		<div class="absolute left-2 z-10 inline-block h-8 w-8 overflow-hidden">
			<input class="cursor-pointer opacity-0" type="color" bind:value={color} />
			<div
				class="absolute inset-0 -z-10 h-8 w-8 rounded-lg"
				style={`background-color: ${color}`}
			></div>
		</div>
		<Input type="text" class="w-48 text-center" bind:value={color} />
	</div>
	<div class="space-x-2">
		<Button class="rounded px-4 py-4" onclick={randomColor} icon={{ name: 'dice', size: '20px' }} />
		<Button
			class="rounded px-4 py-4"
			onclick={() => (showSettings = !showSettings)}
			icon={{ name: 'sliders', size: '20px' }}
		/>
		<Button
			class="rounded px-4 py-4"
			color="primary"
			onclick={() => (showExport = !showExport)}
			icon={{ name: 'export', size: '20px' }}
		/>
	</div>
</div>

<!-- Settings tooltip -->
{#if showSettings}
	<div
		class="fixed bottom-20 left-1/2 -translate-x-1/2 transform rounded-lg border border-stone-200 bg-white p-4 shadow-md"
	>
		<div class="flex flex-col space-y-6">
			<div class="flex justify-center space-x-16">
				<div class="flex items-center space-x-6">
					<div>Name</div>
					<Input type="text" name="name" placeholder="name" bind:value={colorName} />
				</div>
				<div class="flex items-center space-x-6">
					<div>Hue</div>
					<Input type="number" name="hue" placeholder="hue" bind:value={nudgeH} />
				</div>
				<div class="flex items-center space-x-6">
					<div>Saturation</div>
					<Input type="number" name="saturation" placeholder="saturation" bind:value={nudgeS} />
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Export modal -->
{#if showExport}
	<!-- Outer -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
		style="background-color: #00000045;"
	>
		<div class="mx-4 w-xl rounded-lg bg-white p-4">
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
						bind:family={renderType}
						options={[
							{ label: 'Tailwind 4', value: 'tw4' },
							{ label: 'Tailwind 3', value: 'tw3' },
							{ label: 'Vanilla CSS', value: 'css' }
						]}
					/>
					<Button class="px-4" onclick={copyFigma}>Copy Figma</Button>
				</div>

				<div class="relative w-full rounded-lg bg-stone-800 px-5 pt-8 pb-5 font-mono text-stone-50">
					<button class="absolute top-3 right-5 text-green-500" onclick={copyRender}>Copy</button>
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
