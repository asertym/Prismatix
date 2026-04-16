<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Footer, Header } from '$modules';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Header />
{@render children()}
<Footer />
