<script>
	import { onMount, onDestroy } from 'svelte';

	let { animation = 'slide-up', children, once } = $props();

	let element;
	let active = $state(false);

	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -100px 0px'
	};

	onMount(() => {
		if (typeof IntersectionObserver === 'undefined') return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && !active) {
				active = true;
				if (once) observer.unobserve(element);
			}
		}, observerOptions);

		if (element) observer.observe(element);

		onDestroy(() => {
			observer.disconnect();
		});
	});
</script>

<div bind:this={element} class="view-animate" class:active data-animation={animation}>
	{@render children?.()}
</div>

<style>
	.view-animate {
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
	}

	.view-animate.active {
		opacity: 1;
		transform: translateY(0);
	}

	[data-animation='fade'] {
		transform: none;
	}

	[data-animation='slide-up'] {
		transform: translateY(30px);
	}

	[data-animation='slide-down'] {
		transform: translateY(-30px);
	}

	[data-animation='scale'] {
		transform: scale(0.95);
	}

	[data-animation='fade'].active {
		transform: none;
	}

	[data-animation='scale'].active {
		transform: scale(1);
	}
</style>
