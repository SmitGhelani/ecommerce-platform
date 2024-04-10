import { CommentModel } from "@/app/models/commentsModel";
import { NextRequest } from "next/server";
import * as EmailValidator from "email-validator";
import "../../lib/data/db"

const POST = async (req:NextRequest) => {
    const {userId, comment, productId, username, email} = await req.json()

    if (!userId) {
        return Response.json({
            success: false, 
            message: "No User Id found"
        })
    }

    if (!username) {
        return Response.json({
            success: false, 
            message: "No Username found"
        })
    }

    if (!email || ! EmailValidator.validate(email)) {
        return Response.json({
            success: false,
            message: "Invalid Email Field"
        })
    }

    if (!productId) {
        return Response.json({
            success: false,
            message: "No Product Id found"
        })
    }

    if (!comment) {
        return Response.json({
            success: false,
            message: "No comment found"
        })
    }

    const commentObj = new CommentModel({
        userId: userId,
        comment:comment,
        productId: productId,
        username: username,
        email:email
    })

    const savedComment = await commentObj.save();

    if (!savedComment) {
        return Response.json({
            success: false,
            message: "Not able add comment" 
        })
    }

    return Response.json({
        success: true,
        comment: savedComment
    })
}


export {POST};