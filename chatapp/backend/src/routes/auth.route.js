import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

//signup
router.post('/signup',signup)


//login
router.post('/login',login)



//logout
router.post('/logout',logout)


//update profile
router.put('/update-profile',protectRoute,updateProfile);

router.get('/check',protectRoute,checkAuth);


export default router;
