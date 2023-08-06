const childProcess = require("child_process");

const readline = require('readline');



const rl = readline.createInterface({

  input: process.stdin,

  output: process.stdout,

});



rl.question("Enter Command: (or 'exit' to quit) : ", input => {

    let commandParts = input.split(" ");

    let commandName = commandParts[0];

    let commandArgs = commandParts.slice(1);



    console.log("Command Entered : ", input);

    console.log("Command Name : ", commandName);

    console.log("Command Args : ", commandArgs);



    let command = null;

    if (process.platform === "win32") {

      command = childProcess.spawn(commandName,commandArgs,{

        shell:true,

      });

    } else {

      command = childProcess.spawn(commandName, commandArgs);

    }

    

     command.stdout.on("data", function (data) {

      console.log(data.toString());

     });

     

     command.stderr.on("data", function (data) {

      console.log(`child process exited with code ${data}`);

     });

     

     command.on("error", function (err) {

       console.log(`child process exited with error ${err}`);

     });

     rl.close();

  });



