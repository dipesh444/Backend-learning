// import npm iexpress from "express";
const cookieParser = require('cookie-parser');
const express = require('express')
const session = require("express-session")

const app = express();


app.use(session(
    {
        secret:"mysecret",
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:1000*60*60 // 1day
        }
    }
));

app.use(cookieParser("dipesh"))

app.get('/',(req,res)=>{
    console.log(req.session);
    console.log(req.session.id);
    console.log("hello");
    
})

app.get('/login',(req,res)=>{
    req.session.user ={
        name:"john",
        email:"abc@gmail.com",
        age:"10"
    }
    console.log("hello");
    
})

app.get('/logout',(req,res)=>{
req.session.destroy()
    
})
app.listen(8080,()=>{
    console.log('server running on port 8080');
    
})