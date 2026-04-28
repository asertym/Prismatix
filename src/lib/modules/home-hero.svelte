<script>
	import { Button, HeroIcon } from '$components';
	let bgImage = $state(
		`background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23000000ff' stroke-width='1' rx='99999' ry='99999' stroke-dasharray='16%2c 16' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");');`
	);
</script>

<div class="home-hero relative flex justify-center overflow-hidden py-28" style="">
	<div class="background absolute inset-0 flex w-full items-center justify-center max-xl:hidden">
		<div
			class="dashes relative -z-10 opacity-40"
			style={`width: 960px; height: 960px; ${bgImage}`}
		></div>
		<div
			class="dashes relative -z-10 opacity-40"
			style={`width: 1100px; height: 1100px; ${bgImage}`}
		></div>
		<div
			class="dashes relative -z-10 opacity-40"
			style={`width: 1240px; height: 1240px; ${bgImage}`}
		></div>
		<HeroIcon
			name="palette"
			href="/palette-generator"
			class="palette hero-icon absolute bg-amber-50 text-amber-950 shadow-amber-600/25"
		/>
		<HeroIcon
			name="contrast"
			href="/contrast-checker"
			class="contrast hero-icon absolute bg-red-50 text-red-950 shadow-red-600/25"
		/>
		<HeroIcon
			name="converter"
			href="/color-converter"
			class="converter hero-icon absolute bg-emerald-50 text-emerald-950 shadow-emerald-600/25"
		/>
		<HeroIcon
			name="gradient"
			href="/gradient-generator"
			class="gradient hero-icon absolute bg-fuchsia-50 text-fuchsia-950 shadow-fuchsia-600/25"
		/>
		<HeroIcon
			name="picker"
			href="/image-picker"
			class="picker hero-icon absolute bg-indigo-50 text-indigo-950 shadow-indigo-600/25"
		/>
		<HeroIcon
			name="mixer"
			href="/color-mixer"
			class="mixer hero-icon absolute bg-lime-50 text-lime-950 shadow-lime-600/25"
		/>
	</div>
	<div class="content z-10 flex w-218 flex-col items-center justify-center space-y-10 text-center">
		<div class="flex flex-col items-center justify-center space-y-6 text-center">
			<h1 class="text-6xl leading-tight font-bold">
				Precision Color Enginnering for Modern Design
			</h1>
			<p class="block max-w-156 text-xl leading-normal">
				Go beyond simple color picking. Access deep analytical tools, advanced accessibility
				standards, and professional-grade composition data, all in one lightning-fast, privacy-first
				toolkit.
			</p>
		</div>
		<div class="hidden gap-4 max-xl:flex">
			<HeroIcon
				name="palette"
				href="/palette-generator"
				class="hero-icon bg-amber-50 text-amber-950"
			/>
			<HeroIcon name="contrast" href="/contrast-checker" class="hero-icon bg-red-50 text-red-950" />
			<HeroIcon
				name="converter"
				href="/color-converter"
				class="hero-icon bg-emerald-50 text-emerald-950"
			/>
			<HeroIcon
				name="gradient"
				href="/gradient-generator"
				class="hero-icon bg-fuchsia-50 text-fuchsia-950"
			/>
			<HeroIcon name="picker" href="/image-picker" class="hero-icon bg-indigo-50 text-indigo-950" />
			<HeroIcon name="mixer" href="/color-mixer" class="hero-icon bg-green-50 text-green-950" />
		</div>
		<div class="space-x-10">
			<Button>To the generator</Button>
			<Button href="#explore" color="link">Explore toolset</Button>
		</div>
	</div>
</div>

<style scoped>
	@reference 'tailwindcss';

	.home-hero {
		box-shadow: 0 0 80px 60px white inset;
	}

	.dashes {
		@apply absolute;
		border-radius: 99999px;
		&:nth-of-type(1) {
			animation: rotate 400s infinite;
		}
		&:nth-of-type(2) {
			animation: rotate-inverse 500s infinite;
		}
		&:nth-of-type(3) {
			animation: rotate 500s infinite;
		}
	}

	:global(.hero-icon) {
		@apply cursor-pointer shadow-sm transition-shadow;
		&:hover {
			@apply shadow-md;
		}
	}

	@media (width <= 96rem) {
		.home-hero {
			box-shadow: 0 0 60px 40px white inset;
		}
		:global(.palette) {
			left: 0 !important;
		}
		:global(.contrast) {
			left: 132px !important;
		}
		:global(.converter) {
			left: 84px !important;
		}
		:global(.gradient) {
			right: 0px !important;
		}
		:global(.picker) {
			right: 132px !important;
		}
		:global(.mixer) {
			right: 84px !important;
		}
	}

	:global(.palette) {
		top: 160px;
		left: 128px;
	}
	:global(.contrast) {
		top: 280px;
		left: 261px;
	}
	:global(.converter) {
		top: 400px;
		left: 207px;
	}
	:global(.gradient) {
		top: 160px;
		right: 128px;
	}
	:global(.picker) {
		top: 280px;
		right: 260px;
	}
	:global(.mixer) {
		top: 400px;
		right: 209px;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes rotate-inverse {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
</style>
