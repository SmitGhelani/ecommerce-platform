import { ProductInterface } from "@/app/interfaces/productInterface";
import { OrderModel } from "@/app/models/orderModel";
import { ProductModel } from "@/app/models/productModel";
import { OrderInterface } from "@/app/orders/page";
import { NextRequest } from "next/server";
import "../../lib/data/db"

const POST = async(req: NextRequest) => {
    const {oid} = await req.json()

    if(!oid) {
        return Response.json({
            success: false,
            message: "Order ID Not Exist"
        })
    }

    const orderDetails = await OrderModel.findOne({_id:oid})

    if(!orderDetails) {
        return Response.json({
            success: false,
            message:"No Order found"
        })
    }

    let productDeatailsArray:ProductInterface[] = []
    
    for(let product in orderDetails.orderSummary) {
        const productdetail = await ProductModel.findOne({_id:orderDetails.orderSummary[product].productId})

        if(productdetail){
            productDeatailsArray.push(productdetail)
        }
    }

    return Response.json({
        success: true,
        myOrderDetail: {
            orderDetails: orderDetails,
            productDetails: productDeatailsArray
        }
    })
}

export {POST};