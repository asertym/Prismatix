<script>
	import { Icon } from '$components';

	let {
		title = 'Title',
		description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, ipsa.',
		label = 'Label',
		href = '/',
		color,
		icon
	} = $props();
</script>

<a
	{href}
	class="group block cursor-pointer overflow-hidden rounded-lg border transition hover:scale-102 hover:shadow-xl {color}"
>
	<div class="relative p-6">
		<div class="background absolute -top-20 -right-20">
			<Icon class="opacity-5" name={icon} size="264px" />
		</div>
		<div class="content space-y-12 text-amber-950">
			<div class="space-y-8">
				<div class="title text-4xl font-medium">{title}</div>
				<div class="description text-lg">{description}</div>
			</div>
			<div class="flex items-center justify-between opacity-75">
				<span>{label}</span>
				<Icon class="relative left-0 transition-all group-hover:left-1" name="arrow-right" />
			</div>
		</div>
	</div>
</a>

<style>
	@reference 'tailwindcss';

	.amber {
		@apply border-amber-100 bg-amber-50;
		&:hover {
			@apply shadow-amber-600/5;
		}
		.background {
			@apply text-amber-600;
		}
		.content {
			@apply text-amber-950;
		}
	}
	.red {
		@apply border-red-100 bg-red-50;
		&:hover {
			@apply shadow-red-600/5;
		}
		.background {
			@apply text-red-600;
		}
		.content {
			@apply text-red-950;
		}
	}
	.emerald {
		@apply border-emerald-100 bg-emerald-50;
		&:hover {
			@apply shadow-emerald-600/5;
		}
		.background {
			@apply text-emerald-600;
		}
		.content {
			@apply text-emerald-950;
		}
	}
	.fuchsia {
		@apply border-fuchsia-100 bg-fuchsia-50;
		&:hover {
			@apply shadow-fuchsia-600/5;
		}
		.background {
			@apply text-fuchsia-600;
		}
		.content {
			@apply text-fuchsia-950;
		}
	}
	.indigo {
		@apply border-indigo-100 bg-indigo-50;
		&:hover {
			@apply shadow-indigo-600/5;
		}
		.background {
			@apply text-indigo-600;
		}
		.content {
			@apply text-indigo-950;
		}
	}
	.lime {
		@apply border-lime-100 bg-lime-50;
		&:hover {
			@apply shadow-lime-600/5;
		}
		.background {
			@apply text-lime-600;
		}
		.content {
			@apply text-lime-950;
		}
	}
</style>
