import appStore from "../lib/store/store";
import { addLoggedInUserData, toggleAuthentication } from "../lib/store/slices/userSlices";
import { NextResponse } from "next/server";

const validateAuthentication = () => {
    
    fetch("https://ecommerce.smitghelani.xyz/api/user/validateAuth")
        .then((response) => response.json())
        .then((data)=>{
            console.log(data)
            if (data.isAuthenticated) {
                appStore.dispatch(addLoggedInUserData(data.currentUser))
                appStore.dispatch(toggleAuthentication(data.isAuthenticated))
                NextResponse.next()
            } else {
                appStore.dispatch(toggleAuthentication(data.isAuthenticated))
                Response.redirect("/signin")
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

export default validateAuthentication;