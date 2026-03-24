<script>
</script>

<div class="grid grid-cols-12 gap-4 rounded-2xl" style="background-color: var(--color-primary-50);">
	<div class="col-span-5 space-y-6 py-16 pl-12">
		<div class="text-3xl font-semibold">How does it work?</div>
		<div class="text-xl">
			Get full control of your personalized color palette in just a few steps
		</div>
	</div>
	<div class="col-span-6 col-start-7 grid grid-cols-2 gap-12 py-16 pr-12">
		<div class="step">
			<div class="number" style="background-color: var(--color-primary-300);">1</div>
			<div class="text">
				<div class="title">Input your color</div>
				<div class="description">Input your base HEX color you want to derive a palette from</div>
			</div>
		</div>
		<div class="step">
			<div class="number" style="background-color: var(--color-primary-300);">2</div>
			<div class="text">
				<div class="title">Let the magic happen</div>
				<div class="description">
					Calculate a Tailwind-style palette, keeping consistency across lightness and chroma.
				</div>
			</div>
		</div>
		<div class="step">
			<div class="number" style="background-color: var(--color-primary-300);">3</div>
			<div class="text">
				<div class="title">Customize & Visualize</div>
				<div class="description">
					Adjust the color variables to your liking, and visualize them below in real-time
					components.
				</div>
			</div>
		</div>
		<div class="step">
			<div class="number" style="background-color: var(--color-primary-300);">4</div>
			<div class="text">
				<div class="title">Export & Share</div>
				<div class="description">
					Click any shade to copy its value, or open the code preview to copy formatted exports.
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';

	.step {
		@apply flex gap-4 px-4;
	}
	.number {
		@apply flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl leading-none font-semibold;
	}
	.text {
		@apply space-y-3;
	}
	.title {
		@apply text-xl font-semibold;
	}
	.description {
		word-wrap: break-word;
	}
</style>
