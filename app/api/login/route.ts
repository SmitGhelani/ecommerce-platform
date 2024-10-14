import { NextRequest } from "next/server";
import * as EmailValidator from "email-validator";
import { UserModel } from "@/app/models/userModel";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import "../../lib/data/db"

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

    const user = await UserModel.findOne({email: email})

    if(!user){
        return Response.json({
            success: false,
            message: "Incorrect Email or Password"
        })
    }
    
    if(!bcrypt.compareSync(password, user.password)){
        return Response.json({
            success: false,
            message: "Invalid Password"
        })
    }

    const token = await new SignJWT({ id: email })
                .setProtectedHeader({ alg: "HS256" })
                .setExpirationTime("1d")
                .sign(new TextEncoder().encode(process.env.SECRET_KEY));

    return Response.json({
        success:true,
        message: "User Logged In Successfully",
        currentUser: user,
        token: token,
    },
        {
            headers: {
                "set-cookie": `token=${token}; HttpOnly; Secure; Path=/; Max-Age=${1 * 60 * 60}; SameSite=None`
            }
        }
    )
}

export {POST};