<script>
	/* eslint-disable svelte/no-at-html-tags */
	import { Icon } from '$components';
	import Author from '$assets/author.webp';
</script>

<div class="space-y-4 max-xl:space-y-2">
	<div class="icon relative xl:top-12">
		<Icon name="quote" class="max-xl:size-11!" size="64px" aria-hidden="true" />
	</div>
	<div class="grid grid-cols-12 gap-6 text-zinc-950">
		<div
			class="z-10 col-start-1 col-end-9 flex flex-col justify-center space-y-6 max-xl:col-end-11"
			style="grid-row: 1;"
		>
			<div
				class="quote text-[32px] leading-relaxed font-medium max-xl:text-2xl max-xl:leading-normal"
			>
				<quote>
					“Excellent tool, no issues at all. This product is so cool, I can’t believe I used to live
					without it up until this point. My life was a lie, and I have to reconsider some of my
					long-term career decisions.”
				</quote>
			</div>
			<div class="author flex items-center gap-6 max-xl:gap-4">
				<div class="image overflow-hidden rounded-full max-xl:size-16">
					<img src={Author} alt="A real reviewer" />
				</div>
				<div class="space-y-2 max-xl:space-y-1">
					<div class="text-xl font-semibold max-xl:text-lg">Real Reviewer</div>
					<div class="role">Product Designer (influencer)</div>
				</div>
			</div>
		</div>
		<div
			class="abstract col-span-4 col-start-9 max-xl:col-span-6 max-xl:col-start-8"
			style="grid-row: 1;"
		>
			{#await import(`$assets/abstract.svg?raw`) then { default: renderIcon }}
				{@html renderIcon}
			{/await}
		</div>
	</div>
</div>

<style>
	.abstract {
		--color-1: var(--color-primary-600);
		--color-2: var(--color-primary-800);
		--color-3: var(--color-primary-200);
		--color-4: var(--color-primary-400);
	}

	.icon {
		color: var(--color-primary-900);
	}

	.quote {
		background: linear-gradient(45deg, var(--color-primary-800), var(--color-primary-900));
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
</style>
