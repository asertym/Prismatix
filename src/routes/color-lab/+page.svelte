<script>
	import { ColorPicker } from '$components';
	import { Hero } from '$modules';
	import { onMount } from 'svelte';

	let activeIndex = $state(0);
	let categories = $state(['Conversions', 'Color Mix', 'Deficiency', 'Symmetry', 'Variations']);
	let inputColor = $state('#3fb8b8');

	let bubbleEl = $state(null);
	let pillEls = $state([]);

	function select(i) {
		activeIndex = i;
		moveBubble(i);
	}

	function moveBubble(i) {
		const pill = pillEls[i];
		if (!pill || !bubbleEl) return;
		bubbleEl.style.left = `${pill.offsetLeft}px`;
		bubbleEl.style.width = `${pill.offsetWidth}px`;
		bubbleEl.style.height = `${pill.offsetHeight}px`;
	}

	onMount(() => moveBubble(activeIndex));
</script>

<div class="container mx-auto mb-24 space-y-12">
	<Hero title="Color Lab" description="A collection of tools to work on a specific color"></Hero>
	<div class="sticky">
		<ColorPicker bind:color={inputColor} />
	</div>
	<div>
		<div class="nav-wrapper mx-auto w-fit rounded-full bg-zinc-100 p-1">
			<span class="bubble" bind:this={bubbleEl}></span>
			{#each categories as pill, i (i)}
				<button
					class="pill"
					class:active={activeIndex === i}
					bind:this={pillEls[i]}
					onclick={() => select(i)}
				>
					<span class="label">{pill}</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';

	.nav-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.pill {
		@apply relative z-10 cursor-pointer rounded-full px-6 py-1;
	}

	.label {
		position: relative;
		z-index: 1;
	}

	.bubble {
		@apply absolute z-0 rounded-full bg-white shadow-xs transition-all;
	}
</style>
