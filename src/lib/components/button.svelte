<script>
	import { Icon } from '$components';
	let {
		class: className,
		ref = $bindable(null),
		size = 'md',
		type = 'button',
		href = void 0,
		color,
		disabled,
		children,
		icon,
		...restProps
	} = $props();
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type}
	href={href && !disabled ? href : undefined}
	disabled={href ? undefined : disabled}
	role={href && disabled ? 'link' : undefined}
	tabindex={href && disabled ? -1 : 0}
	class={`button relative inline-block transition-colors ${size ? ` box-${size}` : ''} ${className ?? ''}`}
	style={`${color ? `--element-color: var(--color-${color}-600); --label-color:var(--color-${color}-50)` : `--element-color:var(--color-stone-50); --label-color:var(--color-stone-900); --color-shadow: var(--color-stone-200)`}`}
	bind:this={ref}
	{...restProps}
>
	<div
		class="button__inner flex items-center justify-center {icon && icon.before === true
			? 'flex-row-reverse'
			: ''}"
	>
		<div class="button__label text-current">{@render children?.()}</div>
		{#if icon}
			<div
				class="button__icon transition duration-100"
				style={`${icon.color ? `color: var(--color-${icon.color}-400)` : 'fill-current text-current'}`}
			>
				<Icon class="fill-current text-current" name={icon.name} size={icon.size} />
			</div>
		{/if}
	</div>
</svelte:element>

<style>
	@reference 'tailwindcss';

	.button {
		@apply cursor-pointer rounded-xl;
		background-color: var(--element-color);
		color: var(--label-color);
	}

	.button:hover,
	.button:active {
		background-color: oklch(from var(--element-color) calc(l - 0.03) c h);
	}
</style>
