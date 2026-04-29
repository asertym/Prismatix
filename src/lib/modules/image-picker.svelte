<script>
	import { createEventDispatcher, tick } from 'svelte';
	import { Icon } from '$components';

	const dispatch = createEventDispatcher();

	let {
		onpick,
		hasImage = $bindable(false),
		file = null,
		onbrowse,
		onload,
		canvasEl = $bindable(null)
	} = $props();

	let loupeCanvasEl = $state(null);
	let hovering = $state(false);
	let pickedColor = $state(null);
	let loupePos = $state({ x: 0, y: 0 });
	let error = $state(null);

	$effect(() => {
		if (file) loadFile(file);
	});

	const LOUPE_SIZE = 100; // loupe canvas display size (px)
	const LOUPE_RADIUS = 20; // how many pixels to sample around cursor
	const LOUPE_OFFSET = 16; // gap between cursor and loupe

	async function loadFile(file) {
		if (!file || !file.type.startsWith('image/')) return;
		const url = URL.createObjectURL(file);
		const img = new Image();
		img.onload = async () => {
			hasImage = true;
			await tick();
			const maxHeight = 520;
			const imgRatio = img.width / img.height;

			let drawWidth = canvasEl.offsetWidth;
			let drawHeight = drawWidth / imgRatio;

			if (drawHeight > maxHeight) {
				drawHeight = maxHeight;
				drawWidth = drawHeight * imgRatio;
			}

			canvasEl.width = canvasEl.offsetWidth;
			canvasEl.height = drawHeight;

			const x = (canvasEl.width - drawWidth) / 2;
			const y = 0;

			const ctx = canvasEl.getContext('2d');
			ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
			ctx.drawImage(img, x, y, drawWidth, drawHeight);
			URL.revokeObjectURL(url);
			onload();
		};
		img.src = url;
	}

	function onDrop(e) {
		e.preventDefault();
		loadFile(e.dataTransfer.files[0]);
	}

	async function handlePaste(e) {
		e.preventDefault();
		const items = e.clipboardData?.items;
		if (!items) return;

		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			if (item.type.startsWith('image/')) {
				const blob = await item.getAsFile();
				loadFile(blob);
				return;
			}
		}
		error = 'No image found in clipboard';
	}

	function getPixel(e) {
		const rect = canvasEl.getBoundingClientRect();
		const x = Math.round((e.clientX - rect.left) * (canvasEl.width / rect.width));
		const y = Math.round((e.clientY - rect.top) * (canvasEl.height / rect.height));
		return { x, y };
	}

	function toHex(r, g, b) {
		return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
	}

	function drawLoupe(cx, cy) {
		if (!canvasEl || !loupeCanvasEl) return;
		const dst = loupeCanvasEl.getContext('2d');
		const dpr = window.devicePixelRatio || 1;

		loupeCanvasEl.width = LOUPE_SIZE * dpr;
		loupeCanvasEl.height = LOUPE_SIZE * dpr;
		loupeCanvasEl.style.width = LOUPE_SIZE + 'px';
		loupeCanvasEl.style.height = LOUPE_SIZE + 'px';

		dst.save();
		dst.scale(dpr, dpr);

		// clip to circle
		dst.beginPath();
		dst.arc(LOUPE_SIZE / 2, LOUPE_SIZE / 2, LOUPE_SIZE / 2, 0, Math.PI * 2);
		dst.clip();

		// draw zoomed region
		dst.imageSmoothingEnabled = false;
		dst.drawImage(
			canvasEl,
			cx - LOUPE_RADIUS,
			cy - LOUPE_RADIUS,
			LOUPE_RADIUS * 2,
			LOUPE_RADIUS * 2,
			0,
			0,
			LOUPE_SIZE,
			LOUPE_SIZE
		);

		// crosshair
		const center = LOUPE_SIZE / 2;
		dst.strokeStyle = 'rgba(255,255,255,0.9)';
		dst.lineWidth = 1;
		dst.beginPath();
		dst.moveTo(center, 0);
		dst.lineTo(center, LOUPE_SIZE);
		dst.moveTo(0, center);
		dst.lineTo(LOUPE_SIZE, center);
		dst.stroke();

		dst.restore();
	}

	function onMouseMove(e) {
		hovering = true;

		const { x, y } = getPixel(e);
		drawLoupe(x, y);

		// position loupe near cursor, flip if near edges
		const rect = canvasEl.getBoundingClientRect();
		const relX = e.clientX - rect.left;
		const relY = e.clientY - rect.top;
		const flipX = relX > rect.width - LOUPE_SIZE - LOUPE_OFFSET * 2;
		const flipY = relY > rect.height - LOUPE_SIZE - LOUPE_OFFSET * 2;

		loupePos = {
			x: flipX ? relX - LOUPE_SIZE - LOUPE_OFFSET : relX + LOUPE_OFFSET,
			y: flipY ? relY - LOUPE_SIZE - LOUPE_OFFSET : relY + LOUPE_OFFSET
		};

		// live color readout
		const [r, g, b] = canvasEl.getContext('2d').getImageData(x, y, 1, 1).data;
		pickedColor = toHex(r, g, b);
	}

	function onMouseLeave() {
		hovering = false;
	}

	function onClick(e) {
		if (!hasImage) return;
		const { x, y } = getPixel(e);
		const [r, g, b] = canvasEl.getContext('2d').getImageData(x, y, 1, 1).data;
		const hex = toHex(r, g, b);
		pickedColor = hex;
		onpick(hex); // call directly instead of dispatch
	}

	function onKeydown(e) {
		if ((e.key === 'Enter' || e.key === ' ') && pickedColor) {
			dispatch('pick', pickedColor);
		}
	}
</script>

<div
	class="picker-wrap overflow-hidden rounded-lg {hasImage
		? 'shadow'
		: 'border-2 border-dashed border-stone-300'}"
>
	<!-- Drop zone / canvas -->
	<div
		class="relative w-full overflow-hidden rounded-lg"
		class:has-image={hasImage}
		ondragover={(e) => e.preventDefault()}
		ondrop={onDrop}
		onpaste={handlePaste}
		role="button"
		tabindex="-1"
	>
		<canvas
			bind:this={canvasEl}
			aria-label="Image color picker canvas. Press Enter or Space to pick the current color."
			class=""
			tabindex={hasImage ? 0 : -1}
			class:active={hasImage}
			onmousemove={onMouseMove}
			onmouseleave={onMouseLeave}
			onclick={onClick}
			onkeydown={onKeydown}
			onfocus={() => {}}
			onblur={() => (hovering = false)}
		></canvas>

		<!-- No image placeholder -->
		{#if !hasImage}
			<button
				type="button"
				class="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-4 text-sm text-stone-500"
				onclick={onbrowse}
				ondragover={(e) => e.preventDefault()}
				ondrop={onDrop}
				aria-label="Upload image. Drop an image or click to browse."
			>
				<Icon name="image" size="64px" aria-hidden="true" />
				<span>Drop an image or click to browse</span>
			</button>
		{/if}

		<!-- Error message -->
		{#if error}
			<div class="mt-2 text-xs text-red-500">{error}</div>
		{/if}

		<!-- Loupe -->
		{#if hovering && hasImage}
			<div class="loupe-wrap" style="left: {loupePos.x}px; top: {loupePos.y}px;">
				<canvas bind:this={loupeCanvasEl} aria-hidden="true"></canvas>
				{#if pickedColor}
					<div
						class="loupe-label swap-text transition duration-75"
						role="status"
						aria-live="polite"
						style="--background: {pickedColor}; background: var(--background);"
					>
						{pickedColor}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.picker-wrap {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
		outline: none;
	}

	canvas:focus-visible {
		outline: 2px solid rgba(0, 0, 0, 0.5);
		outline-offset: 2px;
	}

	canvas.active {
		cursor: crosshair;
	}

	.loupe-wrap {
		position: absolute;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.loupe-wrap canvas {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.8);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
	}

	.loupe-label {
		font-size: 11px;
		font-weight: 500;
		padding: 2px 8px;
		border-radius: 99px;
		letter-spacing: 0.04em;
	}

	button:focus-visible {
		outline: 2px solid rgba(0, 0, 0, 0.5);
		outline-offset: 2px;
	}

	button {
		margin-left: auto;
	}
</style>
