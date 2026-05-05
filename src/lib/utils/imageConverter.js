import { toast } from 'svelte-sonner';
import * as avif from '@jsquash/avif';
import * as jpeg from '@jsquash/jpeg';
import * as jxl from '@jsquash/jxl';
import * as png from '@jsquash/png';
import * as webp from '@jsquash/webp';

const formatModules = {
	avif,
	jpeg,
	jxl,
	png,
	webp
};

function getSourceFormat(fileName) {
	const ext = fileName.split('.').pop().toLowerCase();
	return ext === 'jpg' ? 'jpeg' : ext;
}

export async function convertImage(file, targetFormat, quality) {
	const sourceFormat = getSourceFormat(file.name);
	const sourceModule = formatModules[sourceFormat];
	const targetModule = formatModules[targetFormat];

	if (!sourceModule) {
		toast.error(`Unsupported source format: ${sourceFormat}`);
		return null;
	}

	if (!targetModule) {
		toast.error(`Unsupported target format: ${targetFormat}`);
		return null;
	}

	try {
		const arrayBuffer = await file.arrayBuffer();
		const decoded = await sourceModule.decode(arrayBuffer);
		const encoded = await targetModule.encode(decoded, { quality });
		const blob = new Blob([encoded], { type: `image/${targetFormat}` });

		return {
			blob,
			name: file.name.replace(/\.[^/.]+$/, `.${targetFormat}`)
		};
	} catch (error) {
		toast.error(`Failed to convert ${file.name}: ${error.message}`);
		return null;
	}
}
