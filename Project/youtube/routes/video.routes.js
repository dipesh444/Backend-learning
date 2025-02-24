import express from "express";
import mongoose from "mongoose";


import { checkAuth } from "../middleware/auth.middleware.js";
import Video from "../models/video.model.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js"; // Import Cloudinary config
import fileUpload from "express-fileupload"; // Middleware for handling file uploads

const router = express.Router();

//upload video

router.post("/upload", checkAuth, async (req, res) => {
    try {
        const { title, description, category, tags } = req.body;
        if (!req.files || !req.files.videoUrl || !req.files.thumbnailUrl) {
            return res.status(400).json({ Message: "video and thumbnail required" });
        }

        const videoUpload = await cloudinary.uploader.upload(req.files.videoUrl.tempFilePath, {
            resource_type: "video",
            folder: "videos"
        });
        const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnailUrl.tempFilePath, {
            folder: "thumbnails"
        });
        // create new video
        const newVideo = new Video({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            user_id: req.user._id,
            videoUrl: videoUpload.secure_url,
            videoId: videoUpload.public_id,
            thumbnailUrl: thumbnailUpload.secure_url,
            thumbnailId: thumbnailUpload.public_id,
            category,
            tags: tags ? tags.split(",") : [],
        })

        await newVideo.save();

        res.status(201).json({ message: "video uploaded successfully", newVideo })
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({ Message: "Something Went Wrong" });
    }
});

//update 
router.put("/update/:id", checkAuth, async (req, res) => {
    try {
        const { title, description, category, tags } = req.body;
        const id = req.params.id.trim()
        let video = await Video.findById(id);
        // let video = await Video.findOne({ videoId: id });
        if (!video) {
            return res.status(404).json({ error: "video not found" });
        }
        if (video.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "anauthorised" });

        }

        if (req.files && req.files.thumbnailUrl) {
            await cloudinary.uploader.destroy(video.thumbnailId);

            const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnailUrl.tempFilePath, {
                folder: "thumbnails"
            })

            video.thumbnailUrl = thumbnailUpload.secure_url;
            video.thumbnailId = thumbnailUpload.public_id
        }

        // Update Fields
        video.title = title || video.title;
        video.description = description || video.description;
        video.category = category || video.category;
        video.tags = tags ? tags.split(",") : video.tags;

        await video.save();
        res.status(200).json({ message: "Video updated successfully", video });
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({ error: "Something Went Wrong" });
    }
})


//delete video

router.delete("/delete/:id", checkAuth, async (req, res) => {
    try {
        const videoId = req.params.id;

        let video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({ error: "video not found" });
        }

        if (video.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "anauthorised" });
        }

        //delete from cloudinary
        await cloudinary.uploader.destroy(video.videoId, { resource_type: "video" });
        await cloudinary.uploader.destroy(video.thumbnailId);
        await Video.findByIdAndDelete(videoId);
        res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({ error: "Something Went Wrong" });
    }
})

//get all videos

router.get("/all", async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });
        res.status(200).json({
            data: videos
        })
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({ error: "Something Went Wrong" });
    }
})

//get my videos

router.get("/my-videos", checkAuth, async (req, res) => {
    try {
        const videos = await Video.find({ user_id: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({
            data: videos
        })
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({ error: "Something Went Wrong" });
    }
})

//get videos by id

router.get("/:id", async (req, res) => {
    try {
        const videoId = req.params.id;
        const userId = req.user._id;
        const video = await Video.findByIdAndUpdate(videoId,
            {
                $addToSet:{viewedBy:userId}
            },
            {new:true}
        );

        if (!video) return res.status(404).json({ error: "video not found" });
        res.status(200).json(video);
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).json({ error: "Something Went Wrong" });
    }
})


//get videos by vategory

router.get("/category/:category", async (req, res) => {
    try {
        const videos = await Video.find({ category: req.params.category }).sort({ createdAt: -1 });
        res.status(200).json(videos);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// 🔹 Get Videos by Tags
router.get("/tags/:tag", async (req, res) => {
    try {
        const tag = req.params.tag;
        const videos = await Video.find({ tags: tag }).sort({ createdAt: -1 });
        res.status(200).json(videos);
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


// video like

router.post("/like", checkAuth, async (req, res) => {
    try {
        const { videoId } = req.body;

        const video = await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likedBy: req.user._id },
            $pull: { disLikedBy: req.user._id }
        })
        res.status(200).json({ message: "liked the video", video })
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

//video dislike
router.post("/dislike", checkAuth, async (req, res) => {
    try {
        const { videoId } = req.body;

        const video = await Video.findByIdAndUpdate(videoId, {
            $addToSet: { disLikedBy: req.user._id },
            $pull: { likedBy: req.user._id }
        })
        res.status(200).json({ message: "disliked the video", video })
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
})
export default router;