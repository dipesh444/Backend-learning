import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";


import authRoute from "./routes/auth.routes.js";
import taskRoute from "./routes/task.route.js";
// const session = require("express-session")



const app = express();
const PORT= 8080;

app.use(express.json());
app.use(session({
    secret:"your-secret-key",
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        secure:false,
        maxAge:1000*60*60*24
    }
}))

//Routes
app.get('/',(req,res)=>{
    console.log("home");   
})

app.use('/auth',authRoute)
app.use('/task',taskRoute)

app.listen(PORT,()=>{
    console.log("task manager");
    
})