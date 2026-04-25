import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
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
			$styles: 'src/lib/styles/style.css'
		}
	},
	preprocess: [vitePreprocess],
	vite: {
		ssr: {
			noExternal: ['svelte-sonner']
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
