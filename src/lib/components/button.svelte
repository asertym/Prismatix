<script>
	import { Icon } from '$components';
	let {
		class: className,
		ref = $bindable(null),
		size = 'md',
		type = 'button',
		href = undefined,
		color = 'primary',
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
	class={`button relative inline-block ${!href ? 'px-5 py-3' : ''} transition-colors ${size ? `box box-${size}` : ''} ${color} ${className ?? ''}`}
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
				style={`${icon.color ? `color: var(--color-${icon.color}-400)` : ''}`}
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
	}

	.primary {
		@apply bg-green-300 text-green-950 hover:bg-green-400;
	}
</style>
