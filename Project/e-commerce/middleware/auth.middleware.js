import jwt from "jsonwebtoken";
import User from "../model/user.model.js";


export const protectRoute = async (req,res,next)=>{
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({message:"no access token"})
        }
        try {
            const deccoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(deccoded.userId).select("-password");

            if(!user){
                return res.status(401).json({message:"User not found"});
            }

            req.user = user;
            next();
        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return res.status(401).json({message:"Access token expired"});
            }
            throw new Error(error)
        }
    } catch (error) {
        console.log("Error in protect route middleware", error.message);
        res.status(500).json({ message: error.message });
    }
}


export const adminRoute = (req,res,next)=>{
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        return res.status(403).json({message:"Access denied"})
    }
}