import { ProductModel } from "@/app/models/productModel";
import { NextRequest } from "next/server";

const GET = async (req:NextRequest) => {
    const name = req.nextUrl.searchParams.get("name") as any;

    let searchParam = {}

    if(name){
        searchParam = {$text:{$search:name}}
    }

    const products = await ProductModel.find(searchParam);
    if(!products){
        return Response.json({
            success: false,
            message: "No product found"
        })
    }

    return Response.json({
        success: true,
        products: products
    })
}

export {GET};