import { OrderModel } from "@/app/models/orderModel";
import { NextRequest } from "next/server";

const POST = async(req: NextRequest) => {
    const {id} = await req.json()

    if (!id) {
        return Response.json({
            success: false,
            message: "Provide User to get details"
        })
    }

    const myOrders = await OrderModel.find({userId:id})

    if (!myOrders) {
        return Response.json({
            success: false,
            message: "No Orders Found for given User"
        })
    }

    return Response.json({
        success: true,
        myOrders: myOrders
    })
}

export {POST};