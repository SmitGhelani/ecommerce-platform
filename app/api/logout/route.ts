import { cookies } from "next/headers";

const DELETE = () => {
    const destrtoyed = cookies().delete("token")

    return Response.json({
        success:true,
        message: "User Logged out Successfully",
    }) 
}

export {DELETE};