<script>
	import Logo from '$assets/logo.svg';
	import ProductHunt from '$assets/featured.svg';
</script>

<div class="container mx-auto mb-36 rounded-2xl bg-stone-100 px-10 py-16">
	<div class="space-y-8 border-b border-stone-300 pb-12 text-lg">
		<div><img src={Logo} alt="" /></div>
		<div class="grid grid-cols-3 gap-6">
			<div class="space-y-8">
				<div>Visualize your palette</div>
				<div><img src={ProductHunt} alt="" /></div>
			</div>
			<div class="space-y-6">
				<div class="title">More Stuff</div>
				<ul class="space-y-4">
					<li>Docs</li>
					<li>Github</li>
					<li>Contrast Checker</li>
					<li>Component Library</li>
					<li>Tails Express</li>
				</ul>
			</div>
			<div class="space-y-6">
				<div class="title">Let's Connect</div>
				<ul class="space-y-4">
					<li>Contact me</li>
					<li>Github</li>
					<li>Figma</li>
					<li>Linkedin</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="pt-12 text-sm">Copyright &copy; 2026 All Rights Reserved.</div>
</div>

<style>
	@reference 'tailwindcss';
	.title {
		@apply text-lg font-medium text-stone-500 uppercase;
	}
</style>
