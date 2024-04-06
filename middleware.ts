import verifyToken from "@/app/utils/verifyToken"
import { NextRequest, NextResponse } from "next/server"

const middleware = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value;
        const isLoggedIn = token && ( await verifyToken(token))

        if (isLoggedIn) {
            return NextResponse.next()
        } else {
            throw new Error("Invalid User")
        }

    } catch (error) {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }
}

export {middleware};

export const config = {
    matcher: ["/cart", "/checkout", "/order-details", "/orders", "/products", "/toc"]
}