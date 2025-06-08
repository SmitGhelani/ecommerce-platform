import { NextResponse } from "next/server"

const destroyToken = async () => {
    await fetch("http://localhost:3000/api/logout", {
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