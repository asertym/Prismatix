<script>
	import { toast } from 'svelte-sonner';
	import ImageUpload from '$modules/image-upload.svelte';
	import { convertImage } from '$lib/utils/imageConverter';
	import { downloadImage } from '$lib/utils/downloadImage';
	import { Hero } from '$modules';
	import { Button } from '$components';
	import JSZip from 'jszip';

	let files = $state([]);
	let targetFormat = $state('webp');
	let quality = $state(100);
	let isConverting = $state(false);
	let convertedFiles = $state([]);
	let conversionProgress = $state({});
	let previews = $state([]);

	const formats = [
		{ value: 'avif', label: 'AVIF', extension: '.avif' },
		{ value: 'jpeg', label: 'JPEG', extension: '.jpg' },
		{ value: 'jxl', label: 'JPEG XL', extension: '.jxl' },
		{ value: 'png', label: 'PNG', extension: '.png' },
		{ value: 'webp', label: 'WebP', extension: '.webp' }
	];

	const qualityPresets = [50, 75, 90, 100];

	function generatePreview(file) {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const maxWidth = 200;
				const maxHeight = 200;
				let width = img.width;
				let height = img.height;

				if (width > height) {
					if (width > maxWidth) {
						height = Math.round((height * maxWidth) / width);
						width = maxWidth;
					}
				} else {
					if (height > maxHeight) {
						width = Math.round((width * maxHeight) / height);
						height = maxHeight;
					}
				}

				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, width, height);
				resolve(canvas.toDataURL(file.type));
			};
			img.onerror = () => resolve(null);
			img.src = URL.createObjectURL(file);
		});
	}

	async function convertAll() {
		if (files.length === 0) {
			toast.error('Please upload at least one image');
			return;
		}

		isConverting = true;
		convertedFiles = [];
		conversionProgress = {};
		previews = [];

		for (const file of files) {
			conversionProgress[files.indexOf(file)] = 0;
		}

		const promises = files.map(async (file, index) => {
			try {
				conversionProgress[index] = 10;
				const preview = await generatePreview(file);
				if (preview) {
					previews.push(preview);
				}
				conversionProgress[index] = 50;
				const result = await convertImage(file, targetFormat, quality);
				if (result) {
					convertedFiles.push(result);
					toast.success(`Converted ${file.name} to ${targetFormat.toUpperCase()}`);
				}
			} catch (error) {
				console.error('Conversion error:', error);
			}
			conversionProgress[index] = 100;
		});

		await Promise.all(promises);
		isConverting = false;
	}

	async function downloadAll() {
		if (convertedFiles.length === 0) {
			toast.error('No converted images to download');
			return;
		}

		const zipName = `converted-images-${Date.now()}.zip`;
		toast.info(`Creating ${zipName}...`);

		const zip = new JSZip();
		for (const file of convertedFiles) {
			zip.file(file.name, file.blob);
		}

		try {
			const content = await zip.generateAsync({ type: 'blob' });
			const link = document.createElement('a');
			link.href = URL.createObjectURL(content);
			link.download = zipName;
			link.click();
			URL.revokeObjectURL(link.href);
			toast.success(`Downloaded ${convertedFiles.length} images as ZIP`);
		} catch (error) {
			console.error('ZIP download error:', error);
			toast.error('Failed to create ZIP file');
		}
	}

	function clearConverted() {
		convertedFiles = [];
		conversionProgress = {};
	}
</script>

<div class="container mx-auto mb-24 space-y-12">
	<Hero
		title="Image Converter"
		description="Convert images between AVIF, JPEG, JPEG XL, PNG, and WebP formats with quality control."
	></Hero>

	<div class="grid grid-cols-2 gap-6">
		<!-- Left Side - Upload & Settings -->
		<div class="space-y-6">
			<!-- Upload -->
			<ImageUpload bind:files />

			<!-- Conversion Settings -->
			<div class="space-y-4 rounded-lg bg-stone-50 p-6">
				<div>
					<label for="output-format" class="mb-2 block text-sm font-medium text-stone-700"
						>Output Format</label
					>
					<select
						id="output-format"
						bind:value={targetFormat}
						class="w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
					>
						{#each formats as format, index (index)}
							<option value={format.value}>{format.label}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="quality-slider" class="mb-2 block text-sm font-medium text-stone-700"
						>Quality: {quality}%</label
					>
					<div class="flex items-center gap-4">
						<input
							id="quality-slider"
							type="range"
							min="50"
							max="100"
							bind:value={quality}
							class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-blue-600"
						/>
						<div class="flex gap-2">
							{#each qualityPresets as preset, index (index)}
								<button
									onclick={() => (quality = preset)}
									class={`rounded px-3 py-1 text-sm ${
										quality === preset
											? 'bg-blue-600 text-white'
											: 'bg-stone-200 text-stone-700 hover:bg-stone-300'
									}`}
								>
									{preset}%
								</button>
							{/each}
						</div>
					</div>
				</div>

				<div class="flex gap-3 pt-4">
					<Button
						icon={{ name: 'arrow-right', size: '16px' }}
						color="primary"
						onclick={convertAll}
						disabled={isConverting}
					>
						{isConverting ? 'Converting...' : 'Convert'}
					</Button>
					<Button
						icon={{ name: 'clipboard', size: '16px' }}
						color="secondary"
						onclick={downloadAll}
						disabled={convertedFiles.length === 0 || isConverting}
					>
						Download All (ZIP)
					</Button>
				</div>

				{#if isConverting && files.length > 0}
					<div class="rounded-lg bg-stone-50 p-4">
						<div class="mb-2 flex items-center justify-between text-sm">
							<span class="text-stone-600">Conversion Progress</span>
							<span class="text-stone-600"
								>{Math.round(
									Object.values(conversionProgress).reduce((a, b) => a + b, 0) / files.length
								)}%</span
							>
						</div>
						<div class="h-2 w-full rounded-full bg-stone-200">
							<div
								class="h-2 rounded-full bg-blue-600 transition-all duration-300"
								style={`width: ${Math.round(Object.values(conversionProgress).reduce((a, b) => a + b, 0) / files.length)}%`}
							></div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Right Side - Results -->
		<div class="space-y-6">
			{#if previews.length > 0 && convertedFiles.length === 0}
				<div class="rounded-lg bg-stone-50 p-6">
					<h3 class="mb-4 text-lg font-medium">Preview Before Conversion</h3>
					<div class="max-h-[400px] space-y-3 overflow-y-auto">
						{#each previews as preview, index (index)}
							<div
								class="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-3 shadow-sm"
							>
								<div class="flex min-w-0 flex-1 items-center gap-3">
									<img
										class="h-16 w-16 shrink-0 rounded object-cover"
										src={preview}
										alt="Preview"
									/>
									<div class="min-w-0 flex-1">
										<p class="truncate text-sm font-medium text-stone-700">{files[index]?.name}</p>
										<p class="text-xs text-stone-500">
											{(files[index]?.size / 1024).toFixed(2)} KB
										</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{:else if convertedFiles.length > 0}
				<div class="rounded-lg bg-stone-50 p-6">
					<div class="mb-4 flex items-center justify-between">
						<h3 class="text-lg font-medium">Converted Images</h3>
						<button onclick={clearConverted} class="text-sm text-red-600 hover:text-red-700">
							Clear
						</button>
					</div>

					<div class="max-h-[400px] space-y-3 overflow-y-auto">
						{#each convertedFiles as file (file.name)}
							<div
								class="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-3 shadow-sm"
							>
								<div class="flex min-w-0 flex-1 items-center gap-3">
									<svg
										class="h-8 w-8 text-blue-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									<div class="min-w-0 flex-1">
										<p class="truncate text-sm font-medium text-stone-700">{file.name}</p>
										<p class="text-xs text-stone-500">{(file.blob.size / 1024).toFixed(2)} KB</p>
									</div>
								</div>
								<button
									aria-label="Download converted image"
									onclick={() => downloadImage(file.blob, file.name)}
									class="ml-3 rounded p-2 text-blue-600 hover:bg-blue-50"
								>
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
										/>
									</svg>
								</button>
							</div>
						{/each}
					</div>
				</div>
			{:else if files.length > 0}
				<div class="rounded-lg bg-stone-50 p-6 text-center">
					<p class="text-stone-500">Upload images and click Convert to see results here</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	@reference 'tailwindcss';
</style>
