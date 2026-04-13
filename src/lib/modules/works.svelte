<script>
</script>

<div
	class="grid grid-cols-12 gap-6 rounded-2xl max-xl:space-y-6 xl:gap-4"
	style="background-color: var(--color-primary-50);"
>
	<div
		class="col-span-4 space-y-6 max-xl:col-span-12 max-xl:px-12 max-xl:pt-10 max-xl:text-center xl:py-16 xl:pl-12"
	>
		<div class="text-3xl font-semibold">How does it work?</div>
		<div class="text-xl">
			Get full control of your personalized color palette in just a few steps
		</div>
	</div>
	<div
		class="col-span-7 grid grid-cols-2 gap-6 max-xl:col-span-12 max-xl:space-y-6 max-xl:px-8 max-xl:pb-10 xl:col-start-6 xl:py-16 xl:pr-12"
	>
		<div class="step flex-col">
			<div class="flex items-center gap-4">
				<div class="number" style="background-color: var(--color-primary-300);">1</div>
				<div class="title">Input your color</div>
			</div>
			<div class="text">
				<div class="description">Input your base HEX color you want to derive a palette from</div>
			</div>
		</div>
		<div class="step flex-col">
			<div class="flex items-center gap-4">
				<div class="number" style="background-color: var(--color-primary-300);">2</div>
				<div class="title">Let the magic happen</div>
			</div>

			<div class="text">
				<div class="description">
					Calculate a Tailwind-style palette, keeping consistency across lightness and chroma.
				</div>
			</div>
		</div>
		<div class="step flex-col">
			<div class="flex items-center gap-4">
				<div class="number" style="background-color: var(--color-primary-300);">3</div>
				<div class="title">Customize & Visualize</div>
			</div>
			<div class="text">
				<div class="description">
					Adjust the color variables to your liking, and visualize them below in real-time
					components.
				</div>
			</div>
		</div>
		<div class="step flex-col">
			<div class="flex items-center gap-4">
				<div class="number" style="background-color: var(--color-primary-300);">4</div>
				<div class="title">Export & Share</div>
			</div>
			<div class="text">
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
		@apply flex gap-4 px-4 max-xl:px-0;
	}
	.number {
		@apply flex size-11 shrink-0 items-center justify-center rounded-full text-xl leading-none font-semibold max-xl:size-9 max-xl:text-lg;
	}
	.text {
		@apply space-y-3;
	}
	.title {
		@apply text-xl font-semibold max-xl:text-lg;
	}
	.description {
		word-wrap: break-word;
	}
</style>
