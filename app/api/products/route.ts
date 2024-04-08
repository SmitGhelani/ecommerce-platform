import { ProductInterface } from "@/app/interfaces/productInterface";
import { ProductModel } from "@/app/models/productModel";
import { NextRequest } from "next/server";

const GET = async (req:NextRequest) => {
    const name = req.nextUrl.searchParams.get("name") as any;
    const tag = req.nextUrl.searchParams.get("category") as any;

    let searchParam = {}

    if(name){
        searchParam = {$text:{$search:name}}
    }

    let products:ProductInterface[] = []
    if(tag) {
        products = await ProductModel.find(searchParam).where("category").equals(tag).exec();
    }else {
        products = await ProductModel.find(searchParam);
    }
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