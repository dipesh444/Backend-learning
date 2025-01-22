import express from "express";
import { addTasks, fetchTasks } from "../controllers/task.controller.js";
import { validateSession } from "../middleware/session.middleware.js";

const router = express.Router();


//Routes

router.post("/",validateSession,addTasks)
router.get("/",validateSession,fetchTasks)


export default router;
