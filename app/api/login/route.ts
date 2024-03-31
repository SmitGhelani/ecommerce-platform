import { NextRequest } from "next/server";
import * as EmailValidator from "email-validator";
import { UserModel } from "@/app/models/userModel";
import bcrypt from "bcryptjs";

const POST = async (req:NextRequest) => {
    const {email, password} = await req.json()

    if (!email || !EmailValidator.validate(email)) {
        return Response.json({
            success: false,
            message: "Invalid Email Field"
        })
    }

    if (!password) {
        return Response.json({
            success: false,
            message: "Missing Password Field"
        })
    }

    const hashedPassword = await bcrypt.hash(password)

    const user = await UserModel.find({email: email, password:hashedPassword})

    if(!user){
        return Response.json({
            success: false,
            message: "Incorrect Email or Password"
        })
    }

    return Response.json({
        success: true,
        user: user
    })
}

export {POST};