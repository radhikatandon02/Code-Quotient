const https = require("https");
const fs = require("fs");
// const { url } = require("inspector");

function urlPromise(time)
{
    return new Promise(function (resolve,reject)
    {
        setTimeout(function (){
            fs.readFile("./url.txt", "utf-8",function (err,data){
                if(err)
                {
                    reject(err);
                }
                else
                {
                    let array1 = data.split("\r\n");
                    resolve(array1);
                }
            });
        },time);
    });
}

    const promise = urlPromise(2000);
    promise.then(function (array1)
    {
        let array2 = [];
        for(let j=0;j<array1.length;j++)
        {
            array2.push("./"+j+".json");
        }

        for(let i=0;i<array2.length;i++)
        {
            const url = array1[i];
            const fileStream = fs.createWriteStream(array2[i]);
            https.get(url,function (APIResponse)
            {
                APIResponse.on("data",function (streamedData)
                {
                    fileStream.write(streamedData);
                });

                APIResponse.on("end",function ()
                {   
                    fileStream.end();
                    console.log(`Data written successfully to file ${array2[i]}`);
                });

                APIResponse.on("error",function (error)
                {
                    console.log(error);
                });
            });
        }

    });
    promise.catch(function (err)
    {
        console.log(err);
    });
        
