import bcrypt from "bcrypt"
import { User } from "../models/user.model.js";

export const registerUser = async(userName,password)=>{
const hashPassword = await bcrypt.hash(password,10);
const user = new User({userName,password:hashPassword});
return await user.save()
}


export const loginUser = async(userName , password)=>{
    const user = await User.findOne({userName});

    if(!user || !(await bcrypt.compare(password,user.password))){
        throw new Error("invalid username and password")
    }

    return user;
}