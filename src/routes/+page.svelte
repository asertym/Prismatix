<script>
	import { Highlighter } from '$components';
	import { HomeHero, GridTool } from '$modules';
</script>

<div class="container mx-auto space-y-32">
	<HomeHero />
	<div class="space-y-10">
		<div class="text-center text-3xl font-semibold">Your new design companion</div>
		<div class="grid grid-cols-12">
			<div class="col-span-10 col-start-2 grid grid-cols-10 text-lg leading-loose">
				<div class="col-span-4">
					<Highlighter color="before:bg-indigo-400/40">Prismatix</Highlighter> is a lightning-fast, intuitive
					suite of tools designed for designers, developers, and creators who demand visual harmony and
					technical <Highlighter color="before:bg-emerald-400/40">accuracy.</Highlighter> Whatever you’re
					building our toolkit aims to provide the analytical depth that others skip over.
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

	<div class="space-y-10">
		<div class="text-center font-medium tracking-widest text-stone-600 uppercase">
			A growing collection of tools
		</div>
		<div class="grid grid-cols-3 gap-6">
			<GridTool
				color="amber"
				icon="palette"
				title="Palette Generator"
				description="Generate mathematically balanced palettes with semantic roles and proportional weights."
				label="To the generator"
				href="/palette-generator"
			/>
			<GridTool
				color="red"
				icon="contrast"
				title="Contrast Checker"
				description="Ensure perfect legibility in WCAG and APCA for perceptually accurate contrast checking."
				label="My colors need fixin'"
				href="/contrast-checker"
			/>
			<GridTool
				color="emerald"
				icon="converter"
				title="Color Converter"
				description="Seamlessly convert colors between different color formats and more!"
				label="Open the converter"
				href="/color-converter"
			/>
			<GridTool
				color="fuchsia"
				icon="gradient"
				title="Gradient Generator"
				description="Craft smooth, high-performance gradients with advanced control over interpolation and color stops."
				label="I want a smooth gradient"
				href="/gradient-generator"
			/>
			<GridTool
				color="indigo"
				icon="picker"
				title="Image Picker"
				description="Extract intelligent, semantic color palettes directly from any image with deep compositional analysis."
				label="To the extractor"
				href="/image-picker"
			/>
			<GridTool
				color="lime"
				icon="mixer"
				title="Color Mixer"
				description="Blend colors with accuracy and find the perfect intermediate tones for your brand."
				label="Launch the color mixer"
				href="/color-mixer"
			/>
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';
</style>
