import { NextResponse } from "next/server"

const destroyToken = async () => {
    await fetch("https://ecommerce.smitghelani.xyz/api/logout", {
        method: 'DELETE',
      })
    .then((response) => response.json())
    .then((data)=>{
        if (!data.success){
            throw new Error(data.message)
        }
    })
    .catch((error)=>{
        console.log(error)
    })
}

export default destroyToken;