import appStore from "@/app/lib/store/store";
import { UserModel } from "@/app/models/userModel";
import destroyToken from "@/app/utils/destroyToken";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

const GET = async () => {

    const token = cookies().get("token")?.value;
    if (token) {
        const decoded =  decodeJwt(token)

        if (!decoded.id) {
            return Response.json({
                success: false,
                isAuthenticated: false,
                messgae: "No valid cookie found"
            })
        }

        const currentLoggedInUser = await UserModel.findOne({email: decoded.id})
        
        return Response.json({
            success: true,
            isAuthenticated: true,
            messgae: "User is Logged In",
            currentUser: currentLoggedInUser
        })
    } else {
        return Response.json({
            success: true,
            isAuthenticated: false,
            messgae: "User is not Logged In",
        })
    }
    
}

export {GET};