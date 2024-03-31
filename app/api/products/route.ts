import { NextRequest } from "next/server";
import * as EmailValidator from "email-validator";
import { ProductModel } from "@/app/models/productModel";

const POST = async () => {
    console.log("hi");
    const products = await ProductModel.find();
    if(!products){
        return Response.json({
            success: false,
            message: "Incorrect Email or Password"
        })
    }

    return Response.json({
        success: true,
        products: products
    })
}

export {POST};