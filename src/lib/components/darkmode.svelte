<script>
	import Icon from './icon.svelte';

	let dark = $state(false);

	$effect(() => {
		document.documentElement.classList.toggle('dark', dark);
	});
</script>

<!-- Toggle -->
<label
	class="toggle-wrapper relative inline-block h-7 w-16 overflow-hidden rounded-full transition-all"
>
	<input class="input toggle h-0 w-0 opacity-0" type="checkbox" bind:checked={dark} />
	<div class="slider absolute inset-0 flex cursor-pointer items-center px-1.5 transition-all">
		<div
			class="slider-dot align-center relative flex h-4 w-4 justify-center rounded-full transition-all ease-out"
		></div>
		{#if dark}
			<div class="absolute left-2">
				<Icon name="moon" size="18px" />
			</div>
		{:else}
			<div class="absolute right-2">
				<Icon name="sun" size="20px" />
			</div>
		{/if}
	</div>
</label>

<style>
	@reference 'tailwindcss';
	.toggle-wrapper {
		--element-color: var(--color-zinc-200);
		--color-dot: var(--color-zinc-800);
		&:has(.toggle:checked) {
			--element-color: var(--color-zinc-700);
			--color-dot: var(--color-zinc-50);
		}
	}
	.slider {
		background-color: var(--element-color);
	}

	.toggle:checked + .slider {
		background-color: var(--element-color);
	}

	.slider-dot {
		@apply text-zinc-50;
		--size: 1.125rem;

		left: 0;
		width: var(--size);
		height: var(--size);

		background-color: var(--color-dot);
	}

	.toggle:checked + .slider > .slider-dot {
		@apply text-zinc-950;
		left: calc(100% - var(--size));
		background-color: var(--color-dot);
	}
</style>
