import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import session from "express-session";
import userRoutes from "./routes/user.route.js"
import taskRoutes from "./routes/task.route.js"
dotenv.config();
const app = express();
app.use(express.json())

//Session config
app.use(
    session({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:true,
        cookie:{maxAge:600000}
    })
)

const PORT = process.env.PORT || 8080

//Routes
app.get("/",(req,res)=>{
    res.send("Hello");
})

app.use("/api/user",userRoutes)
app.use("/api/task",taskRoutes)
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })
}).catch((error)=>{
    console.error("Error connecting database",error.message); 
})
