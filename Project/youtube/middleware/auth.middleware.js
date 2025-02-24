import jwt from "jsonwebtoken";


export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        
        if (!token) {
            return res.status(401).json({ error: "no token provided" })
        }

        //decode
        const decodedUser = jwt.verify(token, process.env.JWT_TOKEN);

        //attach user
        req.user = decodedUser;
        next()
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({ Message: "Something Went Wrong" });
    }
}