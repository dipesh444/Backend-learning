import mongoose from "mongoose";



export const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_UIR);
        console.log("database connected");
        
    } catch (error) {
        throw new Error("Something went wrong")
    }
}