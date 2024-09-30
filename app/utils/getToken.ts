import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const getToken = async () => {
    const token = cookies().get("token")?.value
    if (!token) {
        return null;
    }

    return await jwtDecode(token);
}

export default getToken;