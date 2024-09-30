import { CommentModel } from "@/app/models/commentsModel";
import { NextRequest } from "next/server";
import "../../lib/data/db"

const POST = async(req: NextRequest) => {
    const {productId} = await req.json()

    if(!productId) {
        return Response.json({
            success: false,
            message: "No Product Id Found"
        })
    }

    const comments = await CommentModel.find({productId: productId})

    if (!comments) {
        return Response.json({
            success: false,
            messgae: "No Comments found"
        })
    }

    return Response.json({
        success: true,
        comments: comments
    })
}

export {POST};