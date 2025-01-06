import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createTask, deleteTask, getAllTask, updateTask } from "../controller/task.controller.js";


const router =Router();

router.get('/',authMiddleware,getAllTask);
router.post('/create',authMiddleware,createTask);
router.put('/update/:id',authMiddleware,updateTask);
router.delete('/delete/:id',authMiddleware,deleteTask);






export default router