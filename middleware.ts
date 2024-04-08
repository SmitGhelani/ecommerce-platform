import verifyToken from "@/app/utils/verifyToken"
import { jwtDecode, JwtPayload } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server"
import appStore from "./app/lib/store/store";
import { addLoggedInUserEmail } from "./app/lib/store/slices/userSlices";
import { getUserData } from "./app/lib/store/actions/user";

const middleware = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value;
        const isLoggedIn = token && ( await verifyToken(token))

        if (isLoggedIn) {
            const decoded = jwtDecode(token);
            appStore.dispatch(addLoggedInUserEmail(decoded.id))
            appStore.dispatch(getUserData(appStore.getState().user.user.email) as any)
            console.log(appStore.getState().user.user)
            return NextResponse.next()
        } else {
            throw new Error("Invalid User")
        }

    } catch (error) {
        console.log(error)
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }
}

export {middleware};

export const config = {
    matcher: ["/cart", "/checkout", "/order-details", "/orders", "/products", "/toc"]
}