import { jwtVerify } from "jose"

const verifyToken = async (token: string) => {
    try {
        const isLoggedIn = await jwtVerify(token, new TextEncoder().encode(`<aen-l'u:eRJjh7a|R:aHFK<53ru*E%}X[xD!a.yJ@4'.oz,y%e4g@aoaz"hZa2`))
        return isLoggedIn;
    } catch (error) {
        throw new Error("Invalid Token")
    }
}

export default verifyToken;