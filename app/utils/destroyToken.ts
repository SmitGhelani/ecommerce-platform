import axios from "axios";
import { cookies } from "next/headers"

const destroyToken = async () => {
    await axios.delete("http://localhost:3000/api/logout")
            .then((response) => {
                if (!response.data.success){
                    throw new Error(response.data.message)
                }
                console.log(response.data.message)
                return Response.redirect("/")
            })
            .catch((error)=>{
                console.log(error)
            })
}

export default destroyToken;