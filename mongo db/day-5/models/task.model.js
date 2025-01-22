import { Schema, Model, model } from "mongoose";


const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    userName:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


const TaskModel = model("task",taskSchema);


export default TaskModel;