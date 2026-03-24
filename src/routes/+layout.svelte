<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$modules/footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
<Footer />
