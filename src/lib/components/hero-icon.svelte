<script>
	import { Icon } from '$components';
	import { createWiggle } from '$lib/wiggle';

	let { name, class: className, href, tooltip, ...restProps } = $props();

	let rotation = $state(0);

	const wiggle = createWiggle({ peak: 10, wiggles: 5 });

	function onWiggle() {
		wiggle((value) => (rotation = value));
	}
</script>

<a
	{href}
	class="block rounded-2xl {tooltip ? 'tooltip' : ''} {className}"
	{...restProps}
	data-tooltip={tooltip}
>
	<div
		class="p-3"
		style="transform: rotate({rotation}deg);"
		role="button"
		tabindex="-1"
		onmouseenter={onWiggle}
	>
		<Icon {name} size="32px" />
	</div>
</a>

<style>
	@reference 'tailwindcss';
	.tooltip {
		&::after {
			@apply absolute max-w-40 rounded-lg border-inherit bg-inherit p-1 px-2 text-center text-sm text-nowrap text-inherit opacity-0 shadow-sm shadow-inherit transition select-none;
			transform: translateX(-50%);
			left: 50%;
			bottom: calc(100% + 8px);
			content: attr(data-tooltip);
		}
		&:hover {
			&::after {
				@apply opacity-100;
			}
		}
	}
</style>
