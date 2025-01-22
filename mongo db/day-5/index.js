import express from "express"
import connectDB from "./config/db.js"
import users from "./models/user.model.js"
import userRoute from "./routes/user.route.js"
import taskRoute from "./routes/task.route.js";
const app = express()

const PORT = 8080;


// connect to db
app.use(express.json())
connectDB();
app.use("/api/",userRoute);
app.use("/api/",taskRoute);


app.get("/" , (req , res)=>{
    res.send("Hello Guys i am from codesnippet")
})


app.listen(PORT , ()=>{
    console.log("DB Connected")
})