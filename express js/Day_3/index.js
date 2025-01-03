
const express = require("express");
var cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser('secret'))

app.get('/',(req,res)=>{
    res.cookie("userId","1231212",{
        maxAge:1000 * 60 *60 * 24,  //for one day validity
        signed:true
    })
    res.send("Hello World")
})

app.get('/product',(req,res)=>{
    console.log("Cookies",req.cookies); 
     console.log("Signed Cookies",req.signedCookies); 
    if (req.cookies.name && req.cookies.name === 'express') {
        res.status(200).send({
            id:1,
            name:"Item-01",
            price:"$1000"
        })
    } else{
        res.status(403).send("You are not authorised")
    }
})

app.listen(8080,()=>{
    console.log('Server listening on port 8080');
    
})