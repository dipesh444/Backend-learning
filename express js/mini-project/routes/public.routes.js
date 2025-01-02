import { Router } from "express";
import {generateToken} from "../utils/token.utils.js";
const publucRoute = Router();

//generate token
publucRoute.get('/generate-token',(req,res)=>{
    const token = generateToken();
    res.status(200).send({
        message:"Token generated successfuly",
        token:token
    })
})

//home route

publucRoute.get('/',(req,res)=>{
    res.status(200).send({
        message:"Welcome to home page",
    })
})


export default publucRoute