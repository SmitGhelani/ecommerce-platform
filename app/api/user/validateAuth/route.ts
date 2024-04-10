import appStore from "@/app/lib/store/store";

const GET = async () => {

    try {
        const user = appStore.getState().user.user
        
        if (user._id !== "") {
            return Response.json({
                success: true,
                isAuthenticated: true,
                messgae: "User is Logged In",
                currentUser: user 
            })
        } else {
            return Response.json({
                success: true,
                isAuthenticated: false,
                messgae: "User is not Logged In",
            })
        }
    } catch {
        return Response.json({
            success: true,
            isAuthenticated: false,
            messgae: "User is not Logged In",
        })
    }
    
}

export {GET};