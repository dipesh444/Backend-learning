import express from "express";
import User from "../models/user.model.js";


const router = express.Router();


// CRUD

//1. Create
router.post("/users",async(req,res)=>{
    try {
        const {name,age,weight} = req.body;

        const newUser = new User({name,age,weight});
        await newUser.save();
        res.status(201).json({
            success:true,
            data:newUser,
            message:"successfully user created"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

//2.Read
router.get("/users",async(req,res)=>{
    try {
        const user = await User.find();
        res.status(200).json({
            success:true,
            message:user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})
//3.Update
router.put("/update-user/:id",async(req,res)=>{
    const {id} = req.params;
    const {name,age,weight} = req.body;
    try {
        const updatedUSer = await User.findByIdAndUpdate(id,{name,age,weight},{new:true,runValidators:true})
        if (!updatedUSer) {
        return    res.status(401).json({
                success:false,
                message:"user not found"
            })
        } 
        res.status(200).json({
            success:true,
            user:updatedUSer
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

//4.Delete
router.delete("/delete-user/:id",async(req,res)=>{
    const {id} = req.params;
    try {
       const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return   res.status(401).json({
                success:false,
                message:"user not found"
            })
        }
        res.status(200).json({
            status:true,
            message:"User deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})


export default router;