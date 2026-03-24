<script>
	/* eslint-disable svelte/no-at-html-tags */
	import { Icon } from '$components';
	import Author from '$assets/author.jpg';
</script>

<div class="grid grid-cols-12 gap-6 text-stone-950">
	<div class="col-span-7 flex flex-col justify-center space-y-6">
		<div class="icon">
			<Icon name="quote" size="64px" />
		</div>
		<div class="quote text-[32px] leading-relaxed font-medium">
			“Excellent tool, no issues at all. This product is so cool, I can’t believe i used to live
			without it up until this point. My life was a lie, and I have to reconsider some of my
			long-term career decisions.”
		</div>
		<div class="author flex items-center gap-6">
			<div class="image overflow-hidden rounded-full">
				<img src={Author} alt="" />
			</div>
			<div class="space-y-2">
				<div class="text-xl font-semibold">Real Reviewer</div>
				<div class="role">Product Designer (influencer)</div>
			</div>
		</div>
	</div>
	<div class="abstract col-span-4 col-start-9">
		{#await import(`$assets/abstract.svg?raw`) then { default: renderIcon }}
			{@html renderIcon}
		{/await}
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
</style>
