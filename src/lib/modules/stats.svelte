<script>
	/* eslint-disable svelte/no-at-html-tags */
</script>

<div class="grid grid-cols-12 gap-6" style="color: var(--color-primary-900);">
	<div class="col-span-10 col-start-2 space-y-18">
		<div class="relative">
			<div class="background absolute inset-0">
				{#await import(`$assets/plane.svg?raw`) then { default: renderIcon }}
					<div style="color: var(--color-primary-900);">
						{@html renderIcon}
					</div>
				{/await}
			</div>
			<div class="space-y-6 py-10">
				<div class="text-center text-5xl font-bold">Trusted by creators worldwide</div>
				<div class="text-center">
					This product is so great and awesome that literally everyone uses it, <br /> it's actually insane
					if you think about it.
				</div>
			</div>
		</div>
		<div class="flex rounded-2xl" style="background-color: var(--color-primary-100);">
			<div class="block">
				<div class="title">560,000+</div>
				<div class="description">Daily users on the platform</div>
			</div>
			<div class="block border-x" style="border-color: #00000015">
				<div class="title">0%</div>
				<div class="description">Service fee</div>
			</div>
			<div class="block border-r" style="border-color: #00000015">
				<div class="title">99.973%</div>
				<div class="description">Uptime guarantee</div>
			</div>
			<div class="block">
				<div class="title">$70 Trillion</div>
				<div class="description">In assets and infrastructure</div>
			</div>
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';

	.block {
		@apply flex w-full flex-col items-center justify-center space-y-2 py-8;
	}

	.title {
		@apply text-2xl font-semibold;
	}

	.description {
		@apply text-center text-nowrap;
	}
</style>
