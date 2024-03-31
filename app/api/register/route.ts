import { NextRequest } from "next/server";
import * as EmailValidator from "email-validator";
import { UserModel } from "@/app/models/userModel";
import bcrypt from "bcryptjs";

const POST = async (req:NextRequest) => {
    const {name, email, password} = await req.json()

    if (!name){
        return Response.json({
            success: false,
            message: "Missing Name Field"
        })
    }

    if (!email || !EmailValidator.validate(email)) {
        return Response.json({
            success: false,
            message: "Missing or Invalid Email Field"
        });
    }

    if (!password){
        return Response.json({
            success: false,
            message: "Missing Password Field"
        })
    }

    const hasedPassword = await bcrypt.hash(password, 10)
    const user = new UserModel({
        name: name,
        email: email,
        password: hasedPassword
    }) 

    await user.save();
    if(!user) {
        return Response.json({
            success: false,
            message: "Login Unsuccessful !!"
        })
    }
    return Response.json({
        success: true,
        user: user
    })
}

export {POST};