Q1.

readExtAndCopy.js


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



Q2.

readFile.js


const fs = require("fs");

const data = fs.readFileSync("D:/Js/index.html","utf-8");

console.log(data);



index.html


<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Document</title>

</head>

<body>

  <p id="myp1">Hello World</p>

  <button onclick="document.getElementById('myp1').innerHTML = 'Hello RADHIKA'">Click Here</button>

  <button onclick="document.getElementById('myp1').style.color = 'Red'">Don't Click Here</button>

  <button onclick="window.print()">print</button>

</body>

<script>

  document.write("Welcome");

  document.getElementById('myp1');

  window.alert('Do you want to work on content');

  console.log(50+23);

</script>

</html>



Q3. 

writeContents.js


const readline = require('readline').createInterface({

  input: process.stdin,

  output: process.stdout,

 });

const fs = require("fs");



readline.question(`What's your name? `, name => {

  readline.question(`Where do you live? `, place =>{

    const input = `Hi My name is ${name}! I live in ${place}.`

    readline.close();

    fs.writeFileSync("D:/Js/a.txt",input, err=>{

    if(err)

    {

      console.log("Something went wrong:",err)

    }

      console.log("Contents Written Successfully");

    });

  });

});

 

a.txt


Hi My name is Radhika Tandon! I live in Allahabad.
