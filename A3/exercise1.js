const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const copyFile = promisify(fs.copyFile);

async function copyFilesByExtension(sourceDir, targetDir, extension) {
  // Create the target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  // Read the contents of the source directory
  const files = await readdir(sourceDir);

  // Process each file/directory
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      // Recursively process subdirectories
      await copyFilesByExtension(filePath, targetDir, extension);
    } 
    else if (path.extname(file) === extension) {
      // Copy the file to the target directory
      const targetPath = path.join(targetDir, file);
      await copyFile(filePath, targetPath);
      console.log(`Copied file: ${filePath}`);
    }
  }
}

// Usage example:
const sourceDirectory = 'D:/Js';
const targetDirectory = 'D:/NewJs';
const fileExtension = '.html';

copyFilesByExtension(sourceDirectory, targetDirectory, fileExtension)
  .then(() => {
    console.log('File copy completed.');
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
