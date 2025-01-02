const http = require("http")
const fs = require("fs")

const PORT = 8080;
const server = http.createServer((req,res)=>{

// 1.

// Downloading file in bad way ❌

// const file = fs.readFileSync("sample.txt")
//     res.end(file)


    //Downloading file in good  way

    // const readableStream = fs.createReadStream("sample.txt")
    // readableStream.pipe(res);
    // res.end();


    //2

    //copy file bad way
//    const file = fs.readFileSync("sample.txt");
//    fs.writeFileSync("output.txt",file)
//     res.end(file)

// downloading file in stream good way
const readStream = fs.createReadStream("sample.txt");
const writeSteram = fs.createWriteStream("outpt.txt")

readStream.on("data",(chunk)=>{
console.log(chunk);
writeSteram.write(chunk)
})
})

server.listen(PORT,()=>{
    console.log(`SERVER is conneccted successfully ✅ ${PORT}`);
    
})