<script>
	/* eslint-disable svelte/no-at-html-tags */
	let { class: className, name, size = '24px', style, ...restProps } = $props();
</script>

{#await import(`$assets/icons/${name}.svg?raw`) then { default: renderIcon }}
	<div
		class={`icon ${className ?? ''}`}
		style={`width: ${size}; height:${size}; ${style}`}
		{...restProps}
	>
		{@html renderIcon}
	</div>
{/await}
