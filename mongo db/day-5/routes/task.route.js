import express from "express";
import Task from "../models/task.model.js";

const router = express.Router();


// create 
router.post('/task',async(req,res)=>{
    const {title, desc, userName} = req.body;
    try {
        const newTask = new Task({title,desc,userName});
        await newTask.save();
        res.status(201).json({
            success:true,
            message:"Task created successfully",
            data:newTask
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

// read
router.get("/task",async(req,res)=>{
    try {
        const tasks = await Task.find();
        res.status(200).json({
            success:true,
            data:tasks
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})


// update 
router.put("/update-task/:id",async(req,res)=>{
    const {id} = req.params;
    const {title,desc,userName} = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id,{title,desc,userName},{new:true,runValidators:true});
        if(!updatedTask){
            return res.status(401).json({
                status:false,
                message:"task not found"
            })
        }
        res.status(200).json({
            status:true,
            data:updatedTask,
            message:"Task updated successully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

// delete

router.delete("/delete-task/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(401).json({
                success:false,
                message:"Task Not found"
            })
        }
        res.status(200).json({
            success:true,
            data:deletedTask,
            message:"Task deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})



export default router;