<script>
	import { Gradpick, Input, Icon } from '$components';
	import { Hero } from '$modules';
	import { scale } from 'svelte/transition';
	import { copyValue } from '$lib/utils';

	let stops = $state([
		{ id: 0, pos: 0, color: '#112A46' },
		{ id: 1, pos: 100, color: '#ACC8E5' }
	]);

	let preview = $state('');

	const gradient = $derived(
		[...stops]
			.sort((a, b) => a.pos - b.pos)
			.map((s) => `${s.color} ${s.pos}%`)
			.join(', ')
	);

	let sorted = $derived([...stops].sort((a, b) => a.pos - b.pos));

	function gradientConfig() {
		if (gradientType === 'linear') {
			preview = `linear-gradient(${rotation}deg, ${gradient})`;
		}
		if (gradientType === 'radial') {
			preview = `radial-gradient(circle, ${gradient})`;
		}
		if (gradientType === 'conic') {
			preview = `conic-gradient(from ${rotation}deg, ${gradient})`;
		}
	}

	let gradientTypes = $state(['linear', 'radial', 'conic']);

	let rotation = $state('90');
	let gradientType = $state('linear');

	$effect(() => {
		gradientConfig();
	});
</script>

<div class="container mx-auto">
	<Hero
		title="Gradient Generator"
		description="Create beautiful colour gradients for your next project with ease"
	></Hero>

	<div class="grid grid-cols-12 items-start gap-6">
		<!-- Left: Gradient Picker -->
		<div class="col-span-6 space-y-6 rounded-lg bg-zinc-50 p-6">
			<Gradpick bind:stops />
			<div class="grid grid-cols-2 gap-6">
				<div>
					<div class="text-sm">Rotation</div>
					<div><Input type="number" min="0" max="360" bind:value={rotation}></Input></div>
				</div>
				<div>
					<div class="text-sm">Type</div>
					<div>
						<Input
							type="select"
							bind:value={gradientType}
							options={gradientTypes.map((type) => ({ value: type, label: type }))}
						></Input>
					</div>
				</div>
			</div>
		</div>

		<!-- Right: Preview Panel -->
		<div class="col-span-6 space-y-6">
			<!-- Gradient Display -->
			<div class="gradient-display">
				<div class="gradient-box" style="background: {preview};"></div>
			</div>
			<div class="flex gap-4">
				{#each sorted as stop (stop.id)}
					<div
						class="swap-text flex size-12 cursor-pointer items-center justify-center rounded font-mono text-sm transition hover:shadow-md"
						transition:scale
						style="--background: {stop.color}; background: var(--background)"
						role="button"
						tabindex="0"
						onclick={copyValue(stop.color)}
						onkeydown={copyValue(stop.color)}
					>
						<span class="swatch-pos">{stop.pos}%</span>
					</div>
				{/each}
			</div>
			<div class="space-y-8 rounded-lg bg-zinc-50 p-6">
				<!-- CSS Output -->
				<div class="css-output">
					<div class="label">CSS</div>
					<code class="relative block rounded bg-white p-3 font-mono text-sm text-zinc-800">
						<button
							class="absolute top-2.5 right-3 cursor-pointer"
							onclick={() => {
								copyValue(preview);
							}}
						>
							<Icon name="clipboard"></Icon>
						</button>
						{preview}
					</code>
				</div>

				<!-- JSON Output -->
				<div class="json-output">
					<div class="label">JSON</div>
					<pre class="json-code">{JSON.stringify(stops, null, 2)}</pre>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';

	@media (max-width: 768px) {
		.layout-grid {
			grid-template-columns: 1fr;
		}
	}

	.gradient-display {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.gradient-box {
		height: 220px;
		border-radius: 8px;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
	}

	.css-output,
	.json-output {
		margin-bottom: 1.5rem;
	}

	.label {
		@apply mb-2 text-xs font-semibold tracking-wide text-zinc-700 uppercase;
	}

	.json-code {
		display: block;
		background: #f3f4f6;
		padding: 0.75rem;
		border-radius: 6px;
		font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
		font-size: 12px;
		color: #374151;
		line-height: 1.6;
		overflow-x: auto;
		max-height: 200px;
	}

	.swatches {
		display: flex;
		flex-direction: column;
	}
</style>
