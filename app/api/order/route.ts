import { NextRequest } from "next/server";
import {OrderModel} from "@/app/models/orderModel"
const POST = async (req: NextRequest) => { 
    const {name, email, shippingAddress, orderDetails, userDetails} = await req.json()

    
}

export {POST};