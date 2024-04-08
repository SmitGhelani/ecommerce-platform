import { NextRequest } from "next/server";
import * as EmailValidator from "email-validator";
import { UserModel } from "@/app/models/userModel";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

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

    const emailExist = await UserModel.findOne({email:email})

    if (emailExist) {
        return Response.json({
            success: false,
            message: 'Email is already exist.'
        });
    }

    const hasedPassword = await bcrypt.hash(password, 10)

    const user = new UserModel({
        name: name,
        email: email,
        password: hasedPassword
    }) 

    const loggedUser = await user.save();

    if(!loggedUser) {
        return Response.json({
            success: false,
            message: "Login Unsuccessful !!"
        })
    }

    const token = await new SignJWT({id:email})
                .setProtectedHeader({ alg: "HS256" })
                .setExpirationTime("1d")
                .sign(new TextEncoder().encode(process.env.SECRET_KEY));

    return Response.json({
        success:true,
        message: "User Registered Successfully",
        currentUser: loggedUser,
        token: token,
    },
        {
            headers: {
                "set-cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${1 * 60 * 60}; SameSite=Lax`
            }
        }
    )
}

export {POST};