<script>
	import { Input, Icon } from '$components';
	import { Hero } from '$modules';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { nameThatColor, copyValue } from '$lib/utils';
	import Color from 'colorjs.io';
	import convert from 'color-convert';

	let inputColor = $state('#112A46');
	let inputToHex = $derived(new Color(inputColor).toString({ format: 'hex' }));

	let colorName = $derived(nameThatColor(inputToHex));

	let autoCopy = $state(false);
	let selectedFormat = $state('hex');

	let conversions = ['hex', 'rgb', 'hsl', 'hsv', 'xyz', 'lab', 'lch', 'oklab', 'oklch', 'cmyk'];

	let conversionsArray = $derived(
		conversions.map((format) => ({
			name: format,
			value: (() => {
				if (format == 'rgb') return convert.hex.rgb(inputToHex).join(', ');
				if (format == 'hsl') return convert.hex.hsl(inputToHex).join(', ');
				if (format == 'hsv') return convert.hex.hsv(inputToHex).join(', ');
				if (format == 'hwb') return convert.hex.hwb(inputToHex).join(', ');
				if (format == 'xyz') return convert.hex.xyz(inputToHex).join(', ');
				if (format == 'lab') return convert.hex.lab(inputToHex).join(', ');
				if (format == 'lch') return convert.hex.lch(inputToHex).join(', ');
				if (format == 'oklab') return convert.hex.oklab(inputToHex).join(', ');
				if (format == 'oklch') return convert.hex.oklch(inputToHex).join(', ');
				if (format == 'cmyk') return convert.hex.cmyk(inputToHex).join(', ');
				return inputToHex;
			})()
		}))
	);

	$effect(() => {
		if (autoCopy && inputColor) {
			const currentValue = conversionsArray.find((f) => f.name == selectedFormat)?.value;
			if (currentValue) copyValue(currentValue, `Auto-Copy: ${currentValue}`);
		}
	});
</script>

<div class="container mx-auto mb-24 space-y-12">
	<Hero
		title="Color Converter"
		description="Calculate the contrast ratio of text and background colours."
	></Hero>

	<div class="grid grid-cols-2 gap-6">
		<!-- Left Side -->
		<div class="rounded-lg bg-stone-50 p-6">
			<!-- Title -->
			<div>
				<div>Enter a color</div>
				<div>Can be a name, hex, rgb, hsl, hwb, cmyk, lch, oklch.</div>
			</div>
			<!-- Input & Name -->
			<div class="flex items-center gap-6">
				<div class="relative flex items-center">
					<div
						class="absolute right-3 z-10 size-6 rounded-lg"
						style={`background-color: ${inputColor}`}
					>
						<ColorPicker
							bind:hex={inputColor}
							isAlpha="false"
							sliderDirection="horizontal"
							position="responsive"
							label=""
						/>
					</div>
					<div class="w-full">
						<Input type="text" name="name" bind:value={inputColor} class="w-full" />
					</div>
				</div>
				<div>{colorName}</div>
			</div>
			<div>
				<!-- Gamut mapping -->
			</div>
		</div>
		<!-- Right Side -->
		<div class="space-y-6">
			<!-- Title -->
			<div class="rounded-lg bg-stone-50 p-6">
				<div>Conversion</div>
				<!-- Conversion Table -->
				<div class="grid grid-cols-2 gap-2">
					{#each conversionsArray as item (item.name)}
						<div
							class="group flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-stone-100"
						>
							<div class="uppercase">{item.name}</div>
							<div class="flex items-center gap-4">
								<div>{item.value}</div>
								<div
									class="flex w-0 items-center opacity-0 transition-all group-hover:w-6 group-hover:opacity-100"
								>
									<button
										class="cursor-pointer overflow-hidden transition"
										onclick={copyValue(item.value)}
									>
										<Icon name="clipboard" />
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<!-- Auto-Copy -->
			<div class="space-y-6 rounded-lg bg-stone-50 p-6">
				<!-- Header -->
				<div>
					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<Icon name="flash" />
							<div class="leading-none font-medium">Enable Auto-Copy</div>
						</div>
						<div>
							<Input
								type="toggle"
								label="Auto Copy"
								description="Automatically copy conversion when changing color"
								bind:value={autoCopy}
							/>
						</div>
					</div>
					<div class="text-sm text-stone-700">Automatically copy conversion on new input.</div>
				</div>
				<!-- Dropdown -->
				<Input
					type="select"
					label="Copy Format"
					description="Select which format to copy (required for auto-copy)"
					bind:value={selectedFormat}
					options={conversions.map((format) => ({ value: format, label: format.toUpperCase() }))}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';
</style>
