import verifyToken from "@/app/utils/verifyToken"
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server"

const middleware = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value;
        const isLoggedIn = token && ( await verifyToken(token))

        if (isLoggedIn) {
            const decoded = jwtDecode(token);
            if (decoded) {
                return NextResponse.next()
            }
            
        } else {
            throw new Error("Invalid User")
        }

    } catch (error) {
        console.log(error)
        const url = req.nextUrl.clone()
        url.pathname = '/signin'
        return NextResponse.redirect(url)
    }
}

export {middleware};

export const config = {
    matcher: ["/products", "/cart", "/checkout", "/order-details", "/orders", "/toc"]
}