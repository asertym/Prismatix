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
	class={`button relative inline-block px-5 py-3 transition-colors ${size ? `box box-${size}` : ''} ${color} ${className ?? ''}`}
	bind:this={ref}
	{...restProps}
>
	<div
		class="button-inner flex items-center justify-center {icon && icon.before === true
			? 'flex-row-reverse'
			: ''}"
	>
		<div class="button-label text-current">{@render children?.()}</div>
		{#if icon}
			<div
				class="button-icon transition duration-100"
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
		@apply bg-blue-500 text-blue-50 hover:bg-blue-600;
	}

	.secondary {
		@apply bg-zinc-200 text-zinc-950 hover:bg-zinc-300;
	}

	.tertiary {
		box-shadow: 0px 0px 0px 2px inset var(--color-zinc-800);
	}

	.clear {
		@apply rounded-none p-0;
		&:hover {
			@apply text-blue-500;
			.button-icon {
				@apply translate-x-1;
			}
		}
	}

	.responsive {
		background-color: var(--color-primary-300);
		color: var(--color-primary-950);
		&:hover {
			background-color: var(--color-primary-400);
		}
	}
</style>
