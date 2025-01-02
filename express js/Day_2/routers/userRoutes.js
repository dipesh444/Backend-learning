import { Router } from "express";


const userRouter =Router();


userRouter.get('/createUser', (req, res) => {
    res.send("users page")
})

userRouter.get('/getAllUser', (req, res) => {
    res.send("get all user")
})
userRouter.get('/getUserById', (req, res) => {
    res.send("get  user by id")
})


export default userRouter;