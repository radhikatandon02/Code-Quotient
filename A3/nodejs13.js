Q1.

readExtAndCopy.js
const fs = require("fs");



const source = 'D:/Js/';



const destination = 'D:/Js/Test';



const extension = '.html';



function copyFilesExt(source, destination, extension)

{

  fs.readdir(source,function (err, files)

  {

    if(err)

    {

      console.log(err);

      return;

    }

    else

    {

      for(var i=0;i<files.length;i++)

      {

        file = files[i];

        const fileDir = sourceDir+"/"+file;

        fs.stat(fileDir, function(err,stats)

        {

          if(err)

          {

            console.log(err);

            return;

          }

          else

          {

            if(stats.isDirectory())

            {

              copyFilesExt(fileDir, destination, extension);

            }

            else if(fileDir.endsWith(extension))

            {

              fs.copyFile(fileDir, destination+"/"+file, function(err)

              {

                if(err)

                {

                  console.log(err);

                  return;

                }

                else

                {

                  console.log(`${filename} copied successfully to ${destination}`);

                }

              });

            }

            else

            {

              console.log(" no file with the given extension exists");

            }

          }

        });

      }

    }

  });

}



copyFilesExt(source, destination, extension);



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
