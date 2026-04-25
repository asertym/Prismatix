<script>
	import { page } from '$app/stores';
	import Logo from '$assets/logo.svg';

	const paths = [
		{ name: 'Palette Generator', path: '/' },
		{ name: 'Contrast Checker', path: '/contrast-checker' },
		{ name: 'Converter', path: '/color-converter' },
		{ name: 'Gradient Generator', path: '/gradient-generator' },
		{ name: 'Image Picker', path: '/image-picker' }
	];
</script>

<header class="container mx-auto mt-6 flex items-center justify-between">
	<div class="logo">
		<a href="./"><img src={Logo} alt="Prismatix" /></a>
	</div>
	<nav class="flex items-center space-x-8">
		{#each paths as { name, path }, i (i)}
			{@const active = $page.url.pathname === path ? 'page' : null}
			<a class="nav-link relative block" aria-current={active} href={path}>{name}</a>
		{/each}
	</nav>
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
