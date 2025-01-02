import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();


//dashboard route (accesstoken)

router.get('/dashboard', authMiddleware, (req, res) => {
    res.status(200).send({
        message: `welcome to dashboard  ${req.user.name}`
    });
})




export default router