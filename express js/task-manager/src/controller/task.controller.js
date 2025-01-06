import { readTask,writeTask } from "../utils/file.utils.js";
export const getAllTask = async(req,res)=>{
    if (!req.session.user) {
        return res.status(401).json({message:"unAuthenticated"})
    }
    
    const tasks = await readTask();
    res.json(tasks.filter((task)=>task.username === req.session.user.username))
}
export const createTask = async(req,res)=>{
    const {title,description} = req.body;
    const tasks = await readTask();

    const newTask = {
        id:Date.now(),
        title,
        description,
        username:req.session.user.username,
        completed:false
    }
    tasks.push(newTask);
    await writeTask(tasks);
    res.status(201).json(newTask)

}
export const updateTask = async(req,res)=>{
    const {body ,params:{id}} = req;
    const userId = parseInt(id,10);
    const tasks = await readTask();    
    const userIndex = tasks.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        tasks[userIndex]= {...tasks[userIndex], ...body};
        await writeTask(tasks);
        res.status(200).json({
            message:"task updated successfully",
            task:tasks[userIndex]
        })
    } else {
        res.status(404).json({message:"user not found"})
    }
}
export const deleteTask = async(req,res)=>{    
    const {body ,params:{id}} = req;
    const userId = parseInt(id,10);
    const tasks = await readTask(); 
    const userIndex = tasks.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        tasks.splice(userIndex, 1);
        await writeTask(tasks); 
        res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
    } else {
        res.status(401).json({message:"user not found"})
    }
}