<script>
	import { page } from '$app/stores';
	import Logo from '$assets/logo.svg';
	import { Darkmode } from '$components';

	const paths = [
		{ name: 'Palette Generator', path: '/palette-generator' },
		{ name: 'Contrast Checker', path: '/contrast-checker' },
		{ name: 'Gradient Generator', path: '/gradient-generator' },
		{ name: 'Image Picker', path: '/image-picker' },
		{ name: 'Color Lab', path: '/color-lab' },
		{ name: 'Image Converter', path: '/image-converter' }
	];
</script>

<header
	class="container mx-auto mt-6 flex items-center justify-between transition dark:text-zinc-50"
>
	<div class="logo">
		<a href="./"><img src={Logo} alt="Prismatix" /></a>
	</div>
	<div class="flex items-center space-x-6">
		<nav class="flex items-center space-x-8">
			{#each paths as { name, path }, i (i)}
				{@const active = $page.url.pathname === path ? 'page' : null}
				<a class="nav-link relative block" aria-current={active} href={path}>{name}</a>
			{/each}
		</nav>
		<Darkmode />
	</div>
</header>

<style>
	@reference 'tailwindcss';

	.nav-link {
		@apply relative transition;
	}
	.nav-link[aria-current='page']::before {
		--size: 50%;
		@apply absolute -bottom-2 rounded-full;
		height: 2px;
		width: var(--size);
		left: calc(50% - var(--size) / 2);
		content: '';
		view-transition-name: active-page;
		background: currentColor;
	}
</style>
