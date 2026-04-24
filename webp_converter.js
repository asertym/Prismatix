import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

async function convertJpgToWebp(inputDir) {
	try {
		const files = await fs.readdir(inputDir);
		for (const file of files) {
			if (
				path.extname(file).toLowerCase() === '.jpg' ||
				path.extname(file).toLowerCase() === '.jpeg'
			) {
				const inputPath = path.join(inputDir, file);
				const baseName = path.basename(file, path.extname(file));
				const outputPath = path.join(inputDir, `${baseName}.webp`);

				console.log(`Converting ${file} to WebP...`);
				await sharp(inputPath).webp().toFile(outputPath);
			}
		}
	} catch (error) {
		console.error('Error during conversion:', error);
	}
}

const imageDirectory = './src/lib/assets';
convertJpgToWebp(imageDirectory);
