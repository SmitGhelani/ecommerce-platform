import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Missing Name Field"]
    },
    email: {
        type: String,
        require: [true, "Missing Email Field"]
    },
    password: {
        type: String,
        required: [true, "Missing Password Field"],
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserModel =  mongoose.models.Users || model("Users", UserSchema, "users");

export {UserModel, UserSchema};