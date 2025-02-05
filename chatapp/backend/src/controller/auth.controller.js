import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import { generateToken } from "../utils/utils.js";
import cloudinary from "../lib/cloudinary.js"


export const signup = async (req,res)=>{
const {fullName, email, password} = req.body;
try {
    if (!fullName || !email || !password) {
        return res.status(400).json({message:"All fields required"})
    }
    if (password.length < 6) {
        return res.status(400).json({message:"password must be 6 char long"})
    }

    const user = await User.findOne({email});

    if (user) {
        return res.status(400).json({message:"email id already used"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUSer = new User({
        fullName,
        email,
        password:hashedPassword
    })

    if (newUSer) {
        generateToken(newUSer._id,res);
        await newUSer.save();

        res.status(201).json({
            _id:newUSer._id,
            fullName:newUSer.fullName,
            email:newUSer.email,
            profilePic:newUSer.profilePic
        })
    } else {
        res.status(400).json({message:"invalid user"})
    }
} catch (error) {
    console.error("Error in signup controller:",error.message);
    res.status(500).json({message:"internal server error"})
}

}


export const login = async (req,res)=>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"invalid credentials"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({message:"invalid credentials"});
        }

        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })
    } catch (error) {
    console.error("Error in login controller:",error.message);
    res.status(500).json({message:"internal server error"}) 
    }
}



export const logout = async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logout successfull"})
    } catch (error) {
        console.error("Error in logout controller:",error.message);
        res.status(500).json({message:"internal server error"})
    }
}




export const updateProfile = async (req,res)=>{
    try {
        const {profilePic} = req.body;

        const userId  = req.user._id;
        if (!profilePic) {
            return res.status(400).json({message:"profile picture required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic:uploadResponse.secure_url},
            {new:true}
        )
        res.status(200).json(updatedUser)
    } catch (error) {
        console.error("Error in update controller:",error.message);
        res.status(500).json({message:"internal server error"})
    }
}


export const checkAuth = async (req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkauth controller:",error.message);
        res.status(500).json({message:"internal server error"})
    }
}