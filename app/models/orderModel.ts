import mongoose, { model } from "mongoose";
import {nanoid} from "nanoid";

const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        default: () => nanoid(7),
        index: { unique: true },
    },
    shippingAddress: {
        type: String,
        required: true
    },
    orderSummary: [{
        productId: {
            type: String,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        }
    }],
    orderTotalPrice:{
        type: Number,
        require: true
    },
    userId:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OrderModel =  mongoose.models.Orders || model("Orders", OrderSchema, "orders");

export {OrderModel, OrderSchema};