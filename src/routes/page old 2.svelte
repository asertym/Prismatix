<script>
	import { generateColor } from '$lib/generatecolor test';
	import Color from 'colorjs.io';

	let color = $state('#fd9a00');
	let palette = $state({});

	let shades = [
		{ name: '50', lightness: 98 },
		{ name: '100', lightness: 95 },
		{ name: '200', lightness: 90 },
		{ name: '300', lightness: 82 },
		{ name: '400', lightness: 66 },
		{ name: '500', lightness: 46 },
		{ name: '600', lightness: 33 },
		{ name: '700', lightness: 24 },
		{ name: '800', lightness: 14 },
		{ name: '900', lightness: 7 },
		{ name: '950', lightness: 4 }
	];

	function generatePalette() {
		palette = generateColor(color, false, shades);

		Object.entries(palette).forEach(([shade, color]) => {
			document.documentElement.style.setProperty(`--color-primary-${shade}`, color);
		});
	}
</script>

<div class="container mx-auto p-4">
	<div class="mb-8">
		<label for="color" class="mb-2 block text-sm font-medium">Select Color</label>
		<input type="color" name="color" id="color" bind:value={color} />
		<p class="mt-2 text-sm text-gray-600">Selected color: {color}</p>
		<button onclick={generatePalette}>Generate</button>
	</div>

	<div class="flex">
		{#each Object.entries(palette) as [shade, color]}
			<div class="atlas p-6" style="--background: var(--color-primary-{shade})">{shade}</div>
		{/each}
	</div>
	<div class="flex">
		<div class="bg-amber-50 p-6">50</div>
		<div class="bg-amber-100 p-6">100</div>
		<div class="bg-amber-200 p-6">200</div>
		<div class="bg-amber-300 p-6">300</div>
		<div class="bg-amber-400 p-6">400</div>
		<div class="bg-amber-500 p-6">500</div>
		<div class="bg-amber-600 p-6">600</div>
		<div class="bg-amber-700 p-6">700</div>
		<div class="bg-amber-800 p-6">800</div>
		<div class="bg-amber-900 p-6">900</div>
		<div class="bg-amber-950 p-6">950</div>
	</div>

	<div
		class="mt-20 flex h-[426.13px] w-[456.67px] flex-col items-start justify-start gap-5 rounded-[20px] border border-neutral-200 bg-white p-6"
		style="box-shadow: 0px 10px 10px -5px rgba(0,0,0,0.05);"
	>
		<div class="flex flex-shrink-0 flex-grow-0 items-center justify-between self-stretch">
			<div class="relative flex flex-shrink-0 flex-grow-0 flex-col items-start justify-start">
				<p
					class="w-[73px] flex-shrink-0 flex-grow-0 self-stretch text-left text-base font-semibold text-black"
				>
					Schedule
				</p>
			</div>
			<div
				class="flex h-[30px] w-[30px] flex-shrink-0 flex-grow-0 items-center justify-center rounded-[15px] bg-neutral-100"
			>
				<div
					class="relative flex h-[18px] w-[18px] flex-shrink-0 flex-grow-0 flex-col items-start justify-start"
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="relative h-[18px] w-[18px] flex-shrink-0 flex-grow-0"
						preserveAspectRatio="none"
					>
						<path
							d="M8.51401 2.73599C8.45401 2.79599 8.40301 2.86799 8.36101 2.95199C8.31901 3.03599 8.29201 3.10799 8.28001 3.16799C8.24401 3.31199 8.22601 4.19399 8.22601 5.81399V8.22599H5.77801C4.15801 8.22599 3.25801 8.24999 3.07801 8.29799C2.89801 8.34599 2.76001 8.44199 2.66401 8.58599C2.56801 8.72999 2.52601 8.88599 2.53801 9.05399C2.55001 9.22199 2.61601 9.36599 2.73601 9.48599C2.79601 9.54599 2.86801 9.59699 2.95201 9.63899C3.03601 9.68099 3.10801 9.70799 3.16801 9.71999C3.31201 9.75599 4.19401 9.77399 5.81401 9.77399H8.22601V12.222C8.22601 13.842 8.25001 14.742 8.29801 14.922C8.34601 15.102 8.44201 15.24 8.58601 15.336C8.73001 15.432 8.88601 15.474 9.05401 15.462C9.22201 15.45 9.36601 15.384 9.48601 15.264C9.54601 15.204 9.59701 15.132 9.63901 15.048C9.68101 14.964 9.71401 14.892 9.73801 14.832C9.76201 14.688 9.77401 13.806 9.77401 12.186V9.77399H12.222C13.842 9.77399 14.742 9.74999 14.922 9.70199C15.102 9.65399 15.24 9.55799 15.336 9.41399C15.432 9.26999 15.474 9.11399 15.462 8.94599C15.45 8.77799 15.384 8.63399 15.264 8.51399C15.204 8.45399 15.132 8.40299 15.048 8.36099C14.964 8.31899 14.892 8.28599 14.832 8.26199C14.688 8.23799 13.806 8.22599 12.186 8.22599H9.77401V5.77799C9.77401 4.15799 9.75001 3.25799 9.70201 3.07799C9.65401 2.89799 9.55801 2.75999 9.41401 2.66399C9.27001 2.56799 9.11401 2.52599 8.94601 2.53799C8.77801 2.54999 8.63401 2.61599 8.51401 2.73599Z"
							fill="black"
						></path>
					</svg>
				</div>
			</div>
		</div>
		<div class="flex flex-grow flex-col items-start justify-center gap-5 self-stretch">
			<div class="relative flex flex-grow flex-col items-start justify-center self-stretch">
				<div
					class="relative flex-grow self-stretch rounded-[10px]"
					style="background-color: var(--color-primary-100)"
				>
					<div
						class="absolute top-px left-[95.08px] flex flex-col items-start justify-start gap-[4.480000019073486px] pt-[19px] pr-[45.61000061035156px] pb-[19.899999618530273px] pl-5"
					>
						<p
							class="flex-shrink-0 flex-grow-0 text-left text-sm font-semibold"
							style="color: var(--color-primary-600)"
						>
							Weekly Team Sync
						</p>
						<p
							class="flex-shrink-0 flex-grow-0 text-left text-[11.800000190734863px] font-medium text-black"
						>
							<span
								class="flex-shrink-0 flex-grow-0 text-left text-[11.800000190734863px] font-medium text-black"
								>Quick check-in to align priorities and share</span
							><br /><span
								class="flex-shrink-0 flex-grow-0 text-left text-[11.800000190734863px] font-medium text-black"
								>updates for the week.</span
							>
						</p>
					</div>
					<div
						class="absolute top-[8.18px] left-[15px] flex flex-col items-start justify-start p-5"
					>
						<p
							class="flex-shrink-0 flex-grow-0 text-left text-3xl font-semibold"
							style="color: var(--color-primary-600)"
						>
							9:15
						</p>
						<p
							class="h-2.5 w-[16.89px] flex-shrink-0 flex-grow-0 text-left text-[10px] font-semibold opacity-60"
							style="color: var(--color-primary-600)"
						>
							AM
						</p>
					</div>
					<div
						class="absolute top-[5px] left-[7px] h-[82.38px] w-[5px] rounded-[5px]"
						style="background-color: var(--color-primary-600);"
					></div>
				</div>
			</div>
			<div class="relative flex flex-grow flex-col items-start justify-center self-stretch">
				<div
					class="relative flex-grow self-stretch rounded-[10px] bg-amber-100"
					style="background-color: var(--color-primary-100)"
				>
					<div
						class="absolute top-px left-[105.17px] flex flex-col items-start justify-start gap-[4.485000133514404px] pt-[19px] pr-[43.310001373291016px] pb-[19.895000457763672px] pl-5"
					>
						<p
							class="flex-shrink-0 flex-grow-0 text-left text-sm font-semibold"
							style="color: var(--color-primary-800)"
						>
							Client Pitch Rehearsal
						</p>
						<p
							class="flex-shrink-0 flex-grow-0 text-left text-[11.800000190734863px] font-medium text-black"
						>
							<span
								class="flex-shrink-0 flex-grow-0 text-left text-[11.800000190734863px] font-medium text-black"
								>Run through tomorrow’s presentation and</span
							><br /><span
								class="flex-shrink-0 flex-grow-0 text-left text-[11.800000190734863px] font-medium text-black"
								>refine messaging with the team.</span
							>
						</p>
					</div>
					<div
						class="absolute top-[8.19px] left-[15px] flex flex-col items-start justify-start p-5"
					>
						<p
							class="flex-shrink-0 flex-grow-0 text-left text-3xl font-semibold"
							style="color: var(--color-primary-800)"
						>
							4:00
						</p>
						<p
							class="h-2.5 w-[16.07px] flex-shrink-0 flex-grow-0 text-left text-[10px] font-semibold opacity-60"
							style="color: var(--color-primary-800)"
						>
							PM
						</p>
					</div>
					<div
						class="absolute top-[5px] left-[7px] h-[82.38px] w-[5px] rounded-[5px]"
						style="background-color: var(--color-primary-800);"
					></div>
				</div>
			</div>
			<div class="relative flex flex-grow flex-col items-start justify-center self-stretch">
				<div
					class="relative flex-grow self-stretch rounded-[10px]"
					style="background-color: var(--color-primary-100);"
				>
					<div
						class="absolute top-px left-[100.3px] flex flex-col items-start justify-start gap-[4.480000019073486px] pt-[19px] pr-[30.18000030517578px] pb-[19.899999618530273px] pl-5"
					>
						<p
							class="flex-shrink-0 flex-grow-0 text-left text-sm font-semibold"
							style="color: var(--color-primary-400)"
						>
							Product Design Review
						</p>
						<p
							class="flex-shrink-0 flex-grow-0 text-left text-[11.800000190734863px] font-medium text-black"
						>
							<span
								class="flex-shrink-0 flex-grow-0 text-left text-[11.800000190734863px] font-medium text-black"
								>Collaborative session to go over latest UI/UX</span
							><br /><span
								class="flex-shrink-0 flex-grow-0 text-left text-[11.800000190734863px] font-medium text-black"
								>proposals and feedback.</span
							>
						</p>
					</div>
					<div
						class="absolute top-[8.18px] left-[15px] flex flex-col items-start justify-start p-5"
					>
						<p
							class="flex-shrink-0 flex-grow-0 text-left text-3xl font-semibold"
							style="color: var(--color-primary-400)"
						>
							7:30
						</p>
						<p
							class="h-2.5 w-[16.07px] flex-shrink-0 flex-grow-0 text-left text-[10px] font-semibold opacity-60"
							style="color: var(--color-primary-400)"
						>
							PM
						</p>
					</div>
					<div
						class="absolute top-[5px] left-[7px] h-[82.38px] w-[5px] rounded-[5px]"
						style="background-color: var(--color-primary-400);"
					></div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.atlas {
		background: var(--background);
		color: oklch(from var(--background) round(1.21 - L) 0 0);
	}
</style>
