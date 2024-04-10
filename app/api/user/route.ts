import { NextRequest } from "next/server";
import * as EmailValidator from "email-validator";
import { UserModel } from "@/app/models/userModel";
import "../../lib/data/db"
import appStore from "@/app/lib/store/store";

const POST = async (req:NextRequest) => {
    const {email} = await req.json()

    if (!email || !EmailValidator.validate(email)) {
        return Response.json({
            success: false,
            isAuthenticated: false,
            message: "Missing or Invalid Email"
        });
    }

    const user = await UserModel.findOne({email:email})

    if (!user) {
        return Response.json({
            success: false,
            isAuthenticated: false,
            messgae: "Issue getting user data"
        })
    }

    return Response.json({
        success: true,
        isAuthenticated: true,
        messgae: "User Authenticated Successfully",
        user: user
    })
}

export {POST};