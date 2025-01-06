export const authMiddleware = (req,res,next)=>{
    console.log(req,'req');
    
    if (req.session && req.session.user) {
       return next()
    }
    res.status(401).json({message:"Unauthorised please login"})
}