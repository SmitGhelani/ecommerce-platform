import mongoose, { model } from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: [true, "Missing UserId"]
    },
    username: {
        type: String,
        require: [true, "Missing Username"]
    },
    email: {
        type: String,
        require: [true, "Missing Email"]
    },
    comment: {
        type: String,
        require: [true, "Missing Comment"]
    },
    productId: {
        type: String,
        required: [true, "Missing Product Id Field"],
    },
    rating: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CommentModel =  mongoose.models.Comments || model("Comments", CommentSchema, "comments");

export {CommentModel, CommentSchema};