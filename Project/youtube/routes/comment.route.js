import express from "express";
import mongoose from "mongoose";
import Comment from "../models/comment.model.js";
import { checkAuth } from "../middleware/auth.middleware.js"; // To authenticate users

const router = express.Router();


// add comment
router.post("/new", checkAuth, async (req, res) => {
    try {
        const { video_id, commentText } = req.body;

        if (!video_id || !commentText) {
            return res.status(400).json({ error: "videoid or comment text reaquired" })
        }

        const newComment = new Comment({
            _id: new mongoose.Types.ObjectId(),
            video_id,
            commentText,
            user_id: req.user._id
        })
        await newComment.save();
        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
})

//delete comment

router.delete("/:commentId", checkAuth, async (req, res) => {
    try {
        const { commentId } = req.body;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(400).json({ error: "comment not found" })
        }
        if (comment.user_id.toString() !== req.user._id) {
            return res.status(403).json({ error: "unauthorised to delete comment" })

        }
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
})


//update comment

router.put("/:commentId", checkAuth, async (req, res) => {
    try {
        const { commentId } = req.params;
        const { commentText } = req.body;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.user_id.toString() !== req.user._id) {
            return res.status(403).json({ error: "Unauthorized to edit this comment" });
        }

        comment.commentText = commentText;
        await comment.save();
        res.status(200).json({ message: "Comment updated successfully", comment });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
})


// get video comment

router.get("/comment/:videoId", checkAuth, async (req, res) => {
    try {
        const { videoId } = req.params;

        const comments = await Comment.find({ video_id: videoId })
            .populate("user_id", "channelName logoUrl") // Populate user details
            .sort({ createdAt: -1 }); // Sort by newest comments first

        res.status(200).json({ comments });
    } catch (error) {
        console.error("Fetch Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
})
export default router;


