import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.cotroller.js";


const router = express.Router();

router.get("/",protectRoute,getCoupon);

router.post("/",protectRoute,validateCoupon);


export default router;

