<script>
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	let { files = $bindable() } = $props();

	let isDragging = $state(false);

	const acceptedTypes = ['image/avif', 'image/jpeg', 'image/jxl', 'image/png', 'image/webp'];

	function handleDragOver(e) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(e) {
		e.preventDefault();
		isDragging = false;
	}

	function isDuplicate(file) {
		return files.some(
			(existingFile) => existingFile.name === file.name && existingFile.size === file.size
		);
	}

	function handleDrop(e) {
		e.preventDefault();
		isDragging = false;

		const droppedFiles = Array.from(e.dataTransfer.files).filter(
			(file) => acceptedTypes.includes(file.type) || file.type === 'application/octet-stream'
		);

		if (droppedFiles.length > 0) {
			const uniqueFiles = droppedFiles.filter((file) => !isDuplicate(file));
			files = [...files, ...uniqueFiles];
		} else {
			toast.error(
				'Invalid image format. Please upload .avif, .jpeg, .jpg, .jxl, .png, or .webp files.'
			);
		}
	}

	function clearAll() {
		files = [];
	}

	function handleFileSelect(e) {
		const newFiles = Array.from(e.target.files).filter(
			(file) => acceptedTypes.includes(file.type) || file.type === 'application/octet-stream'
		);
		if (newFiles.length > 0) {
			const uniqueFiles = newFiles.filter((file) => !isDuplicate(file));
			files = [...files, ...uniqueFiles];
		}
	}

	onMount(() => {
		window.addEventListener('paste', handlePaste);
		return () => window.removeEventListener('paste', handlePaste);
	});

	function handlePaste(e) {
		e.preventDefault();
		const items = e.clipboardData.items;
		const pastedFiles = Array.from(items)
			.filter((item) => item.type.startsWith('image/'))
			.map((item) => item.getAsFile());

		if (pastedFiles.length > 0) {
			files = [...files, ...pastedFiles];
		}
	}
</script>

<div class="relative" onpaste={handlePaste}>
	<input
		type="file"
		multiple
		accept=".avif,.jxl,image/*"
		class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
		onchange={handleFileSelect}
	/>

	<div
		class={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
			isDragging ? 'border-blue-500 bg-blue-50' : 'border-zinc-300 hover:border-zinc-400'
		}`}
		role="presentation"
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
		ondrop={handleDrop}
	>
		<div class="space-y-4">
			<div class="flex justify-center">
				<svg class="h-12 w-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
					/>
				</svg>
			</div>
			<div>
				<p class="text-lg font-medium text-zinc-700">Drop images here</p>
				<p class="mt-1 text-sm text-zinc-500">or click to browse, or paste from clipboard</p>
				<p class="mt-2 text-xs text-zinc-400">Supported: .avif, .jpeg, .jpg, .jxl, .png, .webp</p>
			</div>
		</div>
	</div>

	{#if files.length > 0}
		<div class="mt-4 flex items-center justify-between">
			<p class="text-sm text-zinc-600">
				{files.length} file{files.length !== 1 ? 's' : ''} selected
			</p>
			<button onclick={clearAll} class="text-sm font-medium text-red-600 hover:text-red-700">
				Clear all
			</button>
		</div>
	{/if}
</div>

<style>
	@reference 'tailwindcss';
</style>
