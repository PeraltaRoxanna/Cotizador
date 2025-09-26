const fs = require("fs");

//Synchronous way 
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

fs.writeFileSync(`./txt/output.txt`, `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`);
console.log("File written!");

//Asynchronous way - Callback call

/**
 *No need to specify the encoding. Define callback function.
 2 arguments, error and data. 
 */
fs.readFile(`./txt/start.txt`,'utf-8',(err,data) =>{
    console.log(data);
});

//This code is going to run first, and then we are going to get the file read.
//This is because readFile is asynchronous.

console.log("Will read file!");
