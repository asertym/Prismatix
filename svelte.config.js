import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess,
		mdsvex({
			extensions: ['.md']
		})
	],
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$modules: 'src/lib/modules',
			$assets: 'src/lib/assets',
			$icons: 'src/lib/assets/icons',
			$styles: 'src/lib/styles/style.css',
			$content: 'src/content',
			$data: 'src/lib/data'
		}
	},
	vite: {
		ssr: {
			noExternal: ['svelte-sonner']
		}
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
