import { NextRequest } from "next/server";
import {OrderModel} from "@/app/models/orderModel"
import * as EmailValidator from "email-validator";

const POST = async (req: NextRequest) => { 
    const {name, email, shippingAddress, orderDetails, userDetails} = await req.json()

    if (!name) {
        return Response.json({
            success: false,
            message: "Name field is requied"  
        })
    }

    if (!email || !EmailValidator.validate(email)) {
        return Response.json({
            success: false,
            message: "Invalid Email Field"
        })
    }

    if(!shippingAddress){
        return Response.json({
            success: false,
            message: "Shipping Address in requied to make order"
        })
    }
    
    if (!orderDetails) {
        return Response.json({
            success: false,
            message: "No Order details found"
        })
    }

    if (!userDetails) {
        return Response.json({
            success: false,
            message: "No valid use found with request"
        })
    }

    const order = new OrderModel({
        shippingAddress: shippingAddress,
        orderSummary: orderDetails.productSummary,
        orderTotalPrice: orderDetails.totalCartValue,
        userId: userDetails._id
    })

    const placedOrder = await order.save();

    if (!placedOrder) {
        return Response.json({
            success: false,
            message: "Failed place your order"
        })
    }

    return Response.json({
        success: true,
        order: placedOrder
    })
}

export {POST};