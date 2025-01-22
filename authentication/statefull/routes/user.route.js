import express from "express";
import { Login, Logout, Signup } from "../controllers/user.controller.js";
import { validateSession } from "../middleware/session.middleware.js";

const router = express.Router();


//Routes

router.post("/signup",Signup)
router.post("/login",Login)
router.post("/logout",validateSession,Logout)


export default router;
