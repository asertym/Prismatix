<script>
	import { Highlighter } from '$components';
	import { HomeHero, GridTool } from '$modules';

	let { data } = $props();
</script>

<div class="container mx-auto space-y-32">
	<HomeHero />
	<div class="space-y-10">
		<div class="text-center font-medium tracking-widest text-zinc-600 uppercase">
			A growing collection of tools
		</div>
		<div class="grid grid-cols-3 gap-6">
			{#each data.tools as tool, index (index)}
				<GridTool
					color={tool.color}
					icon={tool.icon}
					title={tool.title}
					description={tool.description}
					label={tool.label}
					href={tool.href}
				/>
			{/each}
		</div>
	</div>
	<div class="space-y-10">
		<div class="text-center text-3xl font-semibold">Your new design companion</div>
		<div class="grid grid-cols-12">
			<div class="col-span-10 col-start-2 grid grid-cols-10 text-lg leading-loose">
				<div class="col-span-4">
					<Highlighter color="before:bg-indigo-400/40">Prismatix</Highlighter> is a lightning-fast, intuitive
					suite of tools designed for designers, developers, and creators who demand visual harmony and
					technical <Highlighter color="before:bg-emerald-400/40">accuracy.</Highlighter> Whatever you're
					building, our toolkit aims to provide the analytical depth that others skip over.
				</div>
				<div class="col-span-4 col-start-7">
					We built Prismatix because we felt the industry was settling for
					<Highlighter color="before:bg-rose-400/40">"simple."</Highlighter> Most tools are great at generating
					random colors, but they lack the depth required for real <Highlighter
						color="before:bg-indigo-400/40">professional</Highlighter
					> work. We wanted something more, a toolset that we can be proud about.
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';
</style>
