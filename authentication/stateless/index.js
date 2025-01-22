import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.route.js";
import privateRoutes from "./routes/private.route.js";

dotenv.config();
const PORT = process.env.PORT || 5000
const app = express();
app.use(express.json());

// Connect to MongoDB
// , { useNewUrlParser: true, useUnifiedTopology: true }
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

// Routes
app.use("/auth", authRoutes);
app.use("/private", privateRoutes);

app.get('/',(req,res)=>{
    res.send("hello world")
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});