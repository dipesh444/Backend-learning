import { createTask, getTask } from "../services/task.service.js";


export const addTasks = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await createTask(req.session.userId, title, description);
        res.status(201).json({
            success: true,
            message: "Task Created successfully",
            data: task
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error creating task",
            error: error.message
        })
    }
}


export const fetchTasks = async(req,res) => {
try {
    const tasks = await getTask(req.session.userId);
    res.status(200).json({
        success:true,
        data:tasks
    })
} catch (error) {
    res.status(500).json({
        success: false,
        message: "error fetching task",
        error: error.message
    })
}
}