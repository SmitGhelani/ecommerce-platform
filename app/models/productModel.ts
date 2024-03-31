import mongoose, { model } from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    features: {
        color:{
            type: String
        },
        size:{
            type: String
        },
        Material: {
            type: String
        }
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    addedBy: {
        type: String,
        required: true,
        default: "Admin"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }    
});

const ProductModel =  mongoose.models.Users || model("Users", ProductSchema, "users");

export {ProductModel, ProductSchema};