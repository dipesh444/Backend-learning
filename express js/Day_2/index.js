import express from "express";
import userRouter from "./routers/userRoutes.js";

const app = express();

app.use("/api/v1/users",userRouter);

app.get('/', (req, res) => {
    res.send("HEllo world")
})

app.listen(8080, () => {
    console.log("Server is running on port 3000");

})