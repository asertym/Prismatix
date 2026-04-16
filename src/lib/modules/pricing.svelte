<script>
	import { Button, Icon } from '$components';
	let { class: className } = $props();
</script>

<div class="pricing {className ?? ''}">
	<div class="mb-12 text-center">
		<h2 class="text-4xl font-bold tracking-tight text-stone-900">Simple, transparent pricing</h2>
		<p class="mt-4 text-lg text-stone-600">Choose the plan that works best for you</p>
	</div>

	<div class="grid gap-8 md:grid-cols-3">
		<!-- Free Plan -->
		<div
			class="flex flex-col rounded-3xl border border-stone-200 bg-white p-8 transition-all hover:shadow-lg"
		>
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-xl font-semibold text-stone-900">Free</h3>
				<span class="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600"
					>Starter</span
				>
			</div>
			<div class="mb-8 flex items-baseline">
				<span class="text-4xl font-bold tracking-tight text-stone-900">$0</span>
				<span class="ml-1 text-stone-500">/month</span>
			</div>
			<ul class="mb-8 flex-1 space-y-4 text-sm text-stone-600">
				<li class="flex items-center">
					<Icon name="check" size="18px" class="mr-3" style="color: var(--color-primary-600);" />
					Generate everything
				</li>
				<li class="flex items-center">
					<Icon name="check" size="18px" class="mr-3" style="color: var(--color-primary-600);" />
					Export all you want
				</li>
				<li class="flex items-center">
					<Icon name="check" size="18px" class="mr-3" style="color: var(--color-primary-600);" />
					Life is good
				</li>
			</ul>
			<Button class="w-full py-3" color="primary" href="#">Get Started</Button>
		</div>

		<!-- Pro Plan -->
		<div
			class="flex flex-col rounded-3xl border-2 bg-white p-8 shadow-md transition-shadow hover:shadow-lg"
			style="border-color: var(--color-primary-600); --tw-shadow-color: var(--color-primary-100)"
		>
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-xl font-semibold text-stone-900">Pro</h3>
				<span
					class="rounded-full px-3 py-1 text-xs font-medium"
					style="background-color: var(--color-primary-100); color: var(--color-primary-700);"
					>Most Popular</span
				>
			</div>
			<div class="mb-8 flex items-baseline">
				<span class="text-4xl font-bold tracking-tight text-stone-900">$29</span>
				<span class="ml-1 text-stone-500">/month</span>
			</div>
			<ul class="mb-8 flex-1 space-y-4 text-sm text-stone-600">
				<li class="flex items-center">
					<Icon name="check" size="18px" class="mr-3" style="color: var(--color-primary-600);" />
					All basic features
				</li>
				<li class="flex items-center">
					<Icon name="check" size="18px" class="mr-3" style="color: var(--color-primary-600);" />
					Unlimited projects
				</li>
				<li class="flex items-center">
					<Icon name="check" size="18px" class="mr-3" style="color: var(--color-primary-600);" />
					Priority support
				</li>
				<li class="flex items-center">
					<Icon name="check" size="18px" class="mr-3" style="color: var(--color-primary-600);" />
					Life is even better
				</li>
			</ul>
			<Button class="w-full py-3" color="primary" href="#">Start Free Trial</Button>
		</div>

		<!-- Enterprise Plan -->
		<div
			class="flex flex-col rounded-3xl border border-stone-200 bg-white p-8 transition-all hover:shadow-lg"
		>
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-xl font-semibold text-stone-900">Enterprise</h3>
				<span class="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600"
					>Scale</span
				>
			</div>
			<div class="mb-8 flex items-baseline">
				<span class="text-4xl font-bold tracking-tight text-stone-900">$99</span>
				<span class="ml-1 text-stone-500">/month</span>
			</div>
			<ul class="mb-8 flex-1 space-y-4 text-sm text-stone-600">
				<li class="flex items-center">
					<Icon name="check" size="18px" class="mr-3" style="color: var(--color-primary-600);" />
					Everything in Pro
				</li>
				<li class="flex items-center">
					<Icon name="check" size="18px" class="mr-3" style="color: var(--color-primary-600);" />
					Free beer for life
				</li>
				<li class="flex items-center">
					<Icon name="check" size="18px" class="mr-3" style="color: var(--color-primary-600);" />
					What more could you want
				</li>
			</ul>
			<Button class="w-full py-3" color="primary" href="#">Contact Sales</Button>
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';

	.pricing {
		/* Ensure primary colors are used for accents */
		--text-primary: var(--color-primary-600);
	}

	.text-primary-500 {
		color: var(--color-primary-500);
	}

	.bg-primary-100 {
		background-color: var(--color-primary-100);
	}

	.text-primary-700 {
		color: var(--color-primary-700);
	}

	.border-primary-500 {
		border-color: var(--color-primary-500);
	}
</style>
