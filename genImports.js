import fs from 'fs';
import path from 'path';

// Get the folder path from the command line arguments
const folderPath = process.argv[2];
let absoluteFolderPath;

// Change strings depending on location
const componentsPath = 'src/lib/components';
const modulesPath = 'src/lib/modules';

if (!folderPath) {
	console.error('Please provide a folder path.');
	process.exit(1);
}

if (folderPath == 'components') {
	absoluteFolderPath = path.resolve(componentsPath);
} else if (folderPath == 'modules') {
	absoluteFolderPath = path.resolve(modulesPath);
} else {
	absoluteFolderPath = path.resolve(folderPath);
}

const outputFile = path.join(absoluteFolderPath, 'index.js');

// Function to convert a string to PascalCase
const toPascalCase = (str) => {
	return str.replace(/(^\w|-\w|_\w|\.\w)/g, (match) => match.replace(/[-_.]/, '').toUpperCase());
};

fs.readdir(absoluteFolderPath, (err, files) => {
	if (err) {
		return console.error('Unable to scan directory:', err);
	}

	const svelteFiles = files.filter((file) => file.endsWith('.svelte'));
	if (svelteFiles.length === 0) {
		return console.error('No .svelte files found in the specified directory.');
	}

	let imports = '';
	let exports = 'export {';

	svelteFiles.forEach((file, index) => {
		const fileNameWithoutExtension = path.basename(file, '.svelte');
		const pascalCaseName = toPascalCase(fileNameWithoutExtension);
		imports += `import ${pascalCaseName} from './${file}';\n`;
		exports += `${pascalCaseName}${index < svelteFiles.length - 1 ? ', ' : ''}`;
	});

	exports += '};\n';

	const fileContent = `${imports}\n${exports}`;

	fs.writeFile(outputFile, fileContent, (err) => {
		if (err) {
			return console.error('Error writing file:', err);
		}
		console.log('index has been generated successfully for', folderPath);
	});
});
