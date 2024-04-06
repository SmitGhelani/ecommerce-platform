import { jwtVerify } from "jose"

const verifyToken = async (token: string) => {
    try {
        const isLoggedIn = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET_KEY))
        return isLoggedIn;
    } catch (error) {
        throw new Error("Invalid Token")
    }
}

export default verifyToken;