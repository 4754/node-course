const path = require("node:path");
const fs = require("node:fs");

if(!fs.existsSync("data")){
    fs.mkdirSync("data");
    console.log("Data folder created")
}

const pathForSyncFile = path.join(__dirname,"data",'example.txt');

fs.writeFileSync(pathForSyncFile,"Hello World");

console.log("Written to file");

fs.appendFileSync(pathForSyncFile,"\nHow are you gaurav");
console.log("Written to file");
const readSyncData = fs.readFileSync(pathForSyncFile,'utf8');
console.log(readSyncData);

//  async

const asyncFilePath = path.join(__dirname,"data","asyncExample.txt");

fs.writeFile(asyncFilePath,"Hello Worls of async code!",(err)=>{
    if(err){
        console.log(err);
    }
    fs.appendFile(asyncFilePath,"\n are you loving async programming?",(err)=>{
        if(err){
            console.log(err);
        }
        console.log("Appended to file");
        fs.readFile(asyncFilePath,'utf8',(err,data)=>{
            if(err){
                console.log(err);
            }
            console.log(data)
        })
    })
})

const fsp = require('node:fs/promises')

const filePathForPromise = path.join(__dirname,'data','asyncExamplePromise.txt');
const write = async()=>{
    await fsp.writeFile(filePathForPromise,"\nHow are you gaurav")
        .then((data)=>{
            console.log("file wriiten in promise",data);
        })
        .catch((err)=>{
            console.log(err);
        })
}

write();
