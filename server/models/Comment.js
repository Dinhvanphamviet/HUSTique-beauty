import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: String, ref: 'User', required: true }, content: { type: String, required: true },
    rating: { type: Number, default: 5 },
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema)

export default Comment;
