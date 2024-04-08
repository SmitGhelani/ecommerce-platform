import mongoose, { model } from "mongoose";

const OrderSchema = new mongoose.Schema({
    shippingAddress: {
        type: String,
        required: true
    },
    orderSummary: [{
        productId: {
            type: String
        },
        product: {
            features: {
                Color: {
                    type: String
                },
                Size: {
                    type: String
                },
                Material: {
                    type: String
                }
            },
            product_name:{
                type: String
            },
            description: {
                type: String
            },
            price: {
                type: Number
            },
            category: {
                type: String
            },
            image: {
                type: String
            },
            addedBy: {
                type: String
            },
            createdAt: {
                type: String
            }
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