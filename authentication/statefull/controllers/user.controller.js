import { loginUser, registerUser } from "../services/user.services.js";

export const Signup = async(req,res) =>{
    const {userName,password} = req.body;
    try {
        const user = await registerUser(userName,password);
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error signing up",
            error:error.message
        })
    }
}

export const Login = async(req,res) =>{
    const {userName , password} = req.body;
    try {
        const user = await loginUser(userName , password);

        //save user id in session
        req.session.userId = user._id;
        res.status(200).json({
            success:true,
            message:"login successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error in Login",
            error:error.message
        })
    }
}

export const Logout = async(req,res) =>{
       req.session.destroy(err=>{
        if (err) {
            return res.status(500).json({
                 success: false,
                message: "Error logging out"
            })
        }
        res.clearCookie('connect.sid');
        res.status(200).json({
            success:true,
            message:"Logout succcessfull"
        })
    })
}