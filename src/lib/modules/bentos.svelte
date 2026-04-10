<div class="relative grid grid-cols-12 gap-6">
	<div
		class="col-span-8 block overflow-hidden py-6"
		style="background-color: var(--color-primary-200);"
	>
		<div class="title">Export & Code Formats</div>
		<div>
			Choose how you want the output: OKLCH, HSL, or HEX. Export as Tailwind config (v3 or v4), or
			as simple CSS variables. Preview the code in the export window and copy with one click.
		</div>
	</div>
	<div class="col-span-4 block py-12" style="--background: var(--color-primary-500);">
		<div class="title">Live component previews</div>
		<div>
			Real UI components that update instantly when you change the color. They double as
			documentation as well!
		</div>
	</div>
	<div class="col-span-5 block py-12" style="--background: var(--color-primary-600);">
		<div class="title">Controls you'll love</div>
		<div>
			You get simple, practical controls that let you shape the palette without overthinking it.
			Everything is designed to help you iterate quickly and get to a solid result, without diving
			into heavy color theory.
		</div>
	</div>
	<div class="col-span-7 block py-12" style="--background: var(--color-primary-800);">
		<div class="title">Copy, share, reuse!</div>
		<div>
			Click any shade to copy its value. Use the Export window to grab code for your project. Soon
			you’ll be able to generate share links that open a standalone page for anyone to view your
			palette.
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';

	.block {
		@apply flex flex-col items-center justify-center space-y-6 rounded-2xl px-12 text-center;
		background-color: var(--background);
		color: oklch(from var(--background) round(1.21 - L) 0 0);
	}

	.title {
		@apply text-2xl font-semibold;
	}
</style>
