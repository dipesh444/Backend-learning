const {Readable,Writable} = require("stream");



const readableStream = new Readable({
    highWaterMark:6,
    read() {}
})

const writableStream = new Writable({
    write(streaData) {
        console.log(streaData,'Writting');
        
    }
})

readableStream.on("data",(chunk)=>{
    console.log(chunk.toString());
    writableStream.write(chunk)
})


console.log(readableStream.push("hello"));
