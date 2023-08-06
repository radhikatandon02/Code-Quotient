const https=require("https");

const fs=require("fs");

const APIUrl="https://jsonplaceholder.typicode.com/users"

const fileStream=fs.createWriteStream("./externalData.json");



https.get(APIUrl,function(APIResponse){

  APIResponse.on("data",function(streamedData){

    fileStream.write(streamedData);

  })

  APIResponse.on("end",function(){

    fileStream.end();

    console.log("Data from External API written in file successfully");

  });

  APIResponse.on("error",function(error){

    console.log(error);

  });

});

