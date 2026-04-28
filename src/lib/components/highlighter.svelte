<script>
	let { class: className, color = null, children, ...restProps } = $props();
</script>

<span class="highlighter relative {color ?? 'before:bg-amber-400/40'} {className}" {...restProps}
	>{@render children?.()}</span
>

<style>
	@reference 'tailwindcss';

	.highlighter {
		&::before {
			content: '';
			@apply absolute bottom-0.5 -left-0.5 -z-10;
			width: calc(100% + 2px);
			height: 50%;
			transform: rotate(-4deg);
		}
	}
</style>
