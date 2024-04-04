import { ProductModel } from "@/app/models/productModel";
import { NextRequest } from "next/server";

const POST = async (req:NextRequest) => {

    const {id} = await req.json()

    if(!id){
        return Response.json({
            success: false,
            message: "No product ID found"
        })
    }

    try{
        const productData = await ProductModel.findOne({_id:id});

        if(!productData){
            console.log("error")
            return Response.json({
                success: false,
                message: "No Product found"
            })
        }

        return Response.json({
            success: true,
            product: productData
        })
    } catch (error){
        return Response.json({
            success: false,
            message: "Invalid Product ID"
        })
    }   
}

export {POST};