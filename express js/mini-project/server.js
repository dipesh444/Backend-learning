import express from "express";
import publicRoute from "./routes/public.routes.js";
import privateRoute from "./routes/private.routes.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import  logMiddleware  from "./middleware/log.middleware.js";
const app = express();

const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!fs.existsSync(path.join(__dirname,"logs"))) {
    fs.mkdirSync(path.join(__dirname,"logs"))
}
//inbuild method
app.use(express.json());

//glob custom middleware
app.use(logMiddleware)


//middleware to Routes
app.use("/public",publicRoute)
app.use("/private",privateRoute)




app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    
})