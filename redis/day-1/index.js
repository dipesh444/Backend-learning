const express = require('express');
const redis = require('./client');
const axios = require('axios');


// how we can scale websocket server using pub sub server


const app = express();


app.get("/",async(req,res)=>{
const cacheData = await redis.get("todolist")
    if (cacheData) {
      return res.json(cacheData) 
    }
    const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos");

    await redis.set("todolist",JSON.stringify(data));
    await redis.expire("todolist",30)
    res.json(data)
    
})

app.listen(8080,()=>{
    console.log("server is up");
    
});