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

 

// a.txt (the file where the content is being written by above code)
// Hi My name is Radhika Tandon! I am a B.Tech Student
