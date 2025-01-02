const http = require('http');
const fs = require('fs');
const PORT=8080;



const server = http.createServer((req,res)=>{
    const log = `${Date.now()}: & from ${req.url} New Request Received\n`;

    fs.appendFile("log.txt",log,(err)=>{
        if (err) {
            console.log(err,'error');
            res.statusCode = 500;
            res.end("Internal server error")
            return
        }

        res.end("Hello word from server")
    })
})


server.listen(PORT,()=>{
    console.log(`server connected on port ${PORT}`);
    
})