import { cookies } from "next/headers";

const DELETE = () => {
    const destrtoyed = cookies().delete("token")

    if(!destrtoyed) {
        return Response.json({
            success:false,
            message: "Logout Failed",
        })
    }
    return Response.json({
        success:true,
        message: "User Logged out Successfully",
    }) 
}

export {DELETE};