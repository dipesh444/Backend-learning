import http from "http";
import webSocket,{WebSocketServer} from "ws"


const server = http.createServer((req,res)=>{
    console.log((new Date()) + "received req for" + req.url);
    
})

const wss = new WebSocketServer({server});

wss.on("connection",function connection(ws){
    ws.on("error",console.error);

    ws.on("message", function message(data,isBinary){
        wss.clients.forEach(function each(client) {
            if(client.readyState === webSocket.OPEN){
                client.send(data,{isBinary:isBinary})
            }
        })
    });


    ws.send("hello connection message from ws server")
} )

server.listen(8080,()=>{
    console.log("server listening on port 8080");
    
})




// import http from "http";
// import webSocket, { WebSocketServer } from "ws";

// const server = http.createServer((req, res) => {
//   console.log((new Date()) + " received request for " + req.url);
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello from HTTP server\n");
// });

// const wss = new WebSocketServer({ server });

// wss.on("connection", function connection(ws) {
//   ws.on("error", console.error);

//   ws.on("message", function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === webSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });

//   ws.send("Hello, connection message from WS server");
// });

// server.listen(8080, () => {
//   console.log("Server listening on port 8080");
// });
