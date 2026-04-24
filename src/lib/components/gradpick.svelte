<script>
	import { createEventDispatcher } from 'svelte';
	import { ColorPicker, Input } from '$components';

	let {
		stops = $bindable([
			{ id: 0, pos: 0, color: '#112A46' },
			{ id: 1, pos: 100, color: '#ACC8E5' }
		]),
		minStops = 2
	} = $props();

	const dispatch = createEventDispatcher();

	let nextId = $state(stops.length);
	let selectedId = $state(0);
	let trackEl = $state(null);
	let draggingId = $state(null);

	// track vertical offset during drag
	let dragStartY = $state(null);
	let pendingDelete = $state(false);

	const DELETE_THRESHOLD = 80; // px away from track before it triggers

	const sorted = $derived([...stops].sort((a, b) => a.pos - b.pos));

	const gradient = $derived(
		`linear-gradient(to right, ${sorted.map((s) => `${s.color} ${s.pos}%`).join(', ')})`
	);

	const selected = $derived(
		stops.find((s) => s.id === selectedId) ?? stops.find((s) => s.id === 0) ?? stops[0]
	);

	function clamp(v, lo, hi) {
		return Math.max(lo, Math.min(hi, v));
	}

	function posFromEvent(e) {
		const rect = trackEl.getBoundingClientRect();
		return clamp(Math.round(((e.clientX - rect.left) / rect.width) * 100), 0, 100);
	}

	function addStop(e) {
		if (e.target.closest('.handle')) return;
		const pos = posFromEvent(e);
		const newStop = { id: nextId++, pos, color: '#d28080' };
		stops = [...stops, newStop];
		selectedId = newStop.id;
		dispatch('change', stops);
	}

	function selectStop(id) {
		selectedId = id;
	}

	function removeStop() {
		if (stops.length <= minStops) return;
		stops = stops.filter((s) => s.id !== selectedId);
		selectedId = stops[0].id;
		dispatch('change', stops);
	}

	function updateColor(e) {
		stops = stops.map((s) => (s.id === selectedId ? { ...s, color: e.target.value } : s));
		dispatch('change', stops);
	}

	function updatePos(e) {
		stops = stops.map((s) => (s.id === selectedId ? { ...s, pos: Number(e.target.value) } : s));
		dispatch('change', stops);
	}

	function onPointerDown(e, id) {
		e.stopPropagation();
		selectStop(id);
		draggingId = id;
		dragStartY = e.clientY;
		pendingDelete = false;
		e.currentTarget.setPointerCapture(e.pointerId);
	}

	function onPointerMove(e) {
		const verticalOffset = Math.abs(e.clientY - dragStartY);
		pendingDelete = verticalOffset > DELETE_THRESHOLD;

		// only update horizontal position if not in delete zone
		if (!pendingDelete) {
			const pos = posFromEvent(e);
			stops = stops.map((s) => (s.id === draggingId ? { ...s, pos } : s));
		}
	}

	function onPointerUp() {
		if (draggingId === null) return;

		if (pendingDelete && stops.length > minStops) {
			stops = stops.filter((s) => s.id !== draggingId);
			selectedId = stops[0].id;
			dispatch('change', stops);
		} else {
			dispatch('change', stops);
		}

		draggingId = null;
		pendingDelete = false;
		dragStartY = null;
	}
	function onTrackKeydown(e) {
		if (!selected) return;

		if (e.key === 'Delete' || e.key === 'Backspace') {
			removeStop();
			return;
		}

		const step = e.shiftKey ? 10 : 1;
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			stops = stops.map((s) =>
				s.id === selectedId ? { ...s, pos: clamp(s.pos - step, 0, 100) } : s
			);
			dispatch('change', stops);
		}
		if (e.key === 'ArrowRight') {
			e.preventDefault();
			stops = stops.map((s) =>
				s.id === selectedId ? { ...s, pos: clamp(s.pos + step, 0, 100) } : s
			);
			dispatch('change', stops);
		}
	}

	function onHandleKeydown(e, id) {
		const step = e.shiftKey ? 10 : 1;

		if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
			e.preventDefault();
			const dir = e.key === 'ArrowLeft' ? -1 : 1;
			stops = stops.map((s) =>
				s.id === id ? { ...s, pos: clamp(s.pos + dir * step, 0, 100) } : s
			);
			dispatch('change', stops);
		}

		if (e.key === 'Delete' || e.key === 'Backspace') {
			removeStop();
		}
	}
</script>

<div class="gradient-slider">
	<!-- Track -->
	<button
		type="button"
		class="track-wrap mb-6"
		bind:this={trackEl}
		onclick={addStop}
		onkeydown={onTrackKeydown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		aria-label="Gradient track, click to add a stop"
	>
		<div class="track" style="background: {gradient}"></div>

		{#each stops as stop (stop.id)}
			<div
				role="slider"
				tabindex="0"
				class="handle"
				class:selected={stop.id === selectedId}
				class:will-delete={stop.id === draggingId && pendingDelete}
				style="left: {stop.pos}%; background: {stop.color}"
				aria-label="Color stop {stop.color}"
				aria-valuenow={stop.pos}
				aria-valuemin={0}
				aria-valuemax={100}
				onpointerdown={(e) => onPointerDown(e, stop.id)}
				onkeydown={(e) => onHandleKeydown(e, stop.id)}
			></div>
		{/each}
		<!-- ghost that follows the cursor when in delete zone -->
		{#if pendingDelete && draggingId !== null}
			<div class="delete-hint">release to remove</div>
		{/if}
	</button>

	<!-- Controls -->

	<div class="controls grid grid-cols-2 gap-6">
		<div>
			<div class="flex justify-between">
				<div>Color</div>
				{#if stops.length > minStops}
					<button class="text-red-500" onclick={removeStop}>Remove</button>
				{/if}
			</div>
			<ColorPicker bind:color={selected.color} oninput={updateColor} />
		</div>

		<div>
			<div>Position</div>
			<Input type="number" min="0" max="100" value={selected.pos} oninput={updatePos} />
		</div>
	</div>
</div>

<style>
	.handle.will-delete {
		opacity: 0.4;
		transform: translate(-50%, -50%) scale(0.75);
		box-shadow: 0 0 0 3px tomato;
		transition:
			transform 0.1s,
			opacity 0.1s;
	}

	.delete-hint {
		position: absolute;
		bottom: -24px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 11px;
		color: tomato;
		white-space: nowrap;
		pointer-events: none;
	}

	.gradient-slider {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.track-wrap {
		position: relative;
		height: 32px;
		cursor: crosshair;
	}

	.track {
		position: absolute;
		inset: 0;
		top: 50%;
		height: 12px;
		transform: translateY(-50%);
		border-radius: 6px;
	}

	.handle {
		position: absolute;
		top: 50%;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: 2.5px solid #fff;
		transform: translate(-50%, -50%);
		cursor: grab;
		box-shadow: 0 0 0 1.5px rgba(0, 0, 0, 0.2);
		touch-action: none;
	}

	.handle.selected {
		box-shadow: 0 0 12px 0 var(--color-blue-500);
	}
</style>
