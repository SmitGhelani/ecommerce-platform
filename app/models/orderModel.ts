import mongoose, { model } from "mongoose";

const OrderSchema = new mongoose.Schema({
    orderNumer: {
        type: Number
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
        type: String,
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