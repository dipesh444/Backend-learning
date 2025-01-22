import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup",async(req,res)=>{
    const {userName , password} = req.body;
    try {
        const existingUser = await User.findOne({userName});

        if(existingUser) return res.status(400).json({message:"username alrady exists"})

            const newUser = new User({userName, password})
            await newUser.save();
            res.status(201).json({
                status:true,
                user:newUser
            })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"server error"
        })
    }
})

router.post('/login',async(req,res)=>{
    const {userName , password} = req.body;
    try {
        const user = await User.findOne({userName});
        if(!user) return res.status(401).json({message:"Invalid user name or password"});
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({message:"invalid username or password"});


        const token = jwt.sign({id:user._id,userName:user.userName},process.env.JWT_SECRET, {expiresIn:"1h"});

        res.status(200).json({
            message:"login successfull",
            token
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong",
            error:error.message
        })
    }
});

router.post('/logout',authenticateToken,async(req,res)=>{
    
})
export default router;