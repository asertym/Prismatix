<script>
	import { Icon } from '$components';

	let { type = 'info', class: className, children } = $props();
</script>

<div class="flex items-center space-x-4 rounded-lg p-4 {type} {className}">
	<Icon name={type} />
	<span>
		{@render children?.()}
	</span>
</div>

<style>
	@reference 'tailwindcss';
	.info {
		@apply border border-cyan-200 bg-cyan-50 text-cyan-950;
	}

	.warning {
		@apply border border-amber-200 bg-amber-50 text-amber-950;
	}

	.danger {
		@apply border border-rose-200 bg-rose-50 text-rose-950;
	}

	.success {
		@apply border border-emerald-200 bg-emerald-50 text-emerald-950;
	}
</style>
