const fs = require("fs");
const data = fs.readFileSync("D:/Js/index.html","utf-8");
console.log(data);

//Here index.html file is : 
// <!DOCTYPE html>

// <html lang="en">

// <head>

//   <meta charset="UTF-8">

//   <meta http-equiv="X-UA-Compatible" content="IE=edge">

//   <meta name="viewport" content="width=device-width, initial-scale=1.0">

//   <title>Document</title>

// </head>

// <body>

//   <p id="myp1">Hello World</p>

//   <button onclick="document.getElementById('myp1').innerHTML = 'Hello RADHIKA'">Click Here</button>

//   <button onclick="document.getElementById('myp1').style.color = 'Red'">Don't Click Here</button>

//   <button onclick="window.print()">print</button>

// </body>

// <script>

//   document.write("Welcome");

//   document.getElementById('myp1');

//   window.alert('Do you want to work on content');

//   console.log(50+23);

// </script>

// </html>

