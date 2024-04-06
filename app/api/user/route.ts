import { NextRequest } from "next/server";
import * as EmailValidator from "email-validator";
import { UserModel } from "@/app/models/userModel";

const POST = async (req:NextRequest) => {
    const {email} = await req.json()
    if (!email || !EmailValidator.validate(email)) {
        return Response.json({
            success: false,
            message: "Invalid Email Field"
        })
    }

    const loggedInUser = await UserModel.findOne({email:email})

    if (!loggedInUser) {
        return Response.json({
            success: false,
            message: "Logged In User Is not Valid !!"
        })
    }

    return Response.json({
        success: false,
        loggedInUser: loggedInUser
    })
}

export {POST};