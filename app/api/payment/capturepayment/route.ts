import { NextRequest } from "next/server";
import Razorpay from "razorpay";

const POST = async(req: NextRequest) => {

    const {oid, username, email, address, contactno} = await req.json()

    if (!oid) {
        return Response.json({
            success: false,
            message: "Missing order id, please request with order ID !!!"
        })
    }

    if (!username) {
        return Response.json({
            success: false,
            message: "Missing user's name."
        })
    }

    if (!email) {
        return Response.json({
            success: false,
            message: "Missing user's email ID."
        })
    }

    if (!address) {
        return Response.json({
            success: false,
            message: "Missing user's shipping address."
        })
    }
    
    if (!contactno) {
        return Response.json({
            success: false,
            message: "Missing user's contact number."
        })
    }

    const razorpay_key = process.env.RAZORPAY_API_KEY
    const razorpay_secret = process.env.RAZORPAY_SECRET

    if (!razorpay_key) {
        return Response.json({
            success: false,
            message: "Missing Razorpay API Key."
        })
    }
    
    if (!razorpay_secret) {
        return Response.json({
            success: false,
            message: "Missing Razorpay API Secret."
        })
    }

    const instance = new window.Razorpay({  key_id: razorpay_key,  key_secret: razorpay_secret})

    const new_order = await instance.orders.create({ amount: "1", currency: "INR"})

    return Response.json({
        success: true,
        order: new_order
    })
}

export {POST};