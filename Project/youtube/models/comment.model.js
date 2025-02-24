import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    video_id:{type:mongoose.Schema.Types.ObjectId, ref:"video",required:true},
    commentText:{type:String,required:true},
    user_id:{type:mongoose.Schema.Types.ObjectId, ref:"video",required:true},
},{timestamps:true})


const Comment = mongoose.model("Comment",commentsSchema);

export default Comment