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

<div class="container mx-auto my-24">
	<Hero
		title="Gradient Generator"
		description="Create beautiful colour gradients for your next project with ease"
	></Hero>

	<div class="layout-grid">
		<!-- Left: Gradient Picker -->
		<div class="space-y-6 rounded-lg bg-stone-50 p-6">
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
		<div>
			<!-- Gradient Display -->
			<div class="gradient-display">
				<div class="gradient-box" style="background: {preview};"></div>
			</div>
			<div class="rounded-lg bg-stone-50 p-6">
				<!-- CSS Output -->
				<div class="css-output">
					<label>CSS</label>
					<code class="relative block rounded bg-white p-3 font-mono text-sm text-stone-800">
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

				<!-- Color Swatches -->
				<div class="swatches">
					<h3 class="swatches-title">Stops</h3>
					<div class="flex gap-4">
						{#each sorted as stop (stop.id)}
							<div
								class="swap-text flex size-12 items-center justify-center rounded font-mono text-sm"
								transition:scale
								style="--background: {stop.color}; background: var(--background)"
							>
								<span class="swatch-pos">{stop.pos}%</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- JSON Output -->
				<div class="json-output mt-8">
					<label>JSON</label>
					<pre class="json-code">{JSON.stringify(stops, null, 2)}</pre>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.layout-grid {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 2rem;
		align-items: start;
	}

	@media (max-width: 768px) {
		.layout-grid {
			grid-template-columns: 1fr;
		}
	}

	.panel-title {
		font-size: 14px;
		font-weight: 600;
		color: #374151;
		margin: 0 0 1rem 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
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

	.css-output label,
	.json-output label {
		display: block;
		font-size: 12px;
		font-weight: 600;
		color: #374151;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
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
		gap: 0.75rem;
	}

	.swatches-title {
		font-size: 12px;
		font-weight: 600;
		color: #374151;
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
</style>
