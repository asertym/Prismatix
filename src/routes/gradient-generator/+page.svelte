<script>
	import { Gradpick, Input, Button } from '$components';
	import { Hero } from '$modules';
	import { scale } from 'svelte/transition';

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

	function updateType(type) {
		gradientType = type;
	}

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
		<div class="rounded-lg bg-stone-50 p-6">
			<Gradpick bind:stops />
			<div>
				<div>Rotation</div>
				<div><Input type="number" min="0" max="360" bind:value={rotation}></Input></div>
			</div>
			<div>
				<div class="grid grid-cols-3 gap-6 space-x-4">
					{#each gradientTypes as type, index (index)}
						<Button
							class="px-4 py-4"
							color={gradientType === type ? 'blue' : ''}
							onclick={() => updateType(type)}
						>
							{type}
						</Button>
					{/each}
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
					<code class="css-code">{preview}</code>
				</div>

				<!-- Color Swatches -->
				<div class="swatches">
					<h3 class="swatches-title">Stops</h3>
					<div class="flex gap-6">
						{#each sorted as stop (stop.id)}
							<div class="swatch" transition:scale style="background: {stop.color}">
								<span class="swatch-pos">{stop.pos}%</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- JSON Output -->
				<div class="json-output">
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

	.css-code {
		display: block;
		background: #f3f4f6;
		padding: 0.75rem;
		border-radius: 6px;
		font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
		font-size: 13px;
		color: #1f2937;
		line-height: 1.5;
		overflow-x: auto;
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

	.swatch {
		height: 40px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		padding: 0 0.75rem;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
		color: white;
		font-size: 14px;
	}
</style>
