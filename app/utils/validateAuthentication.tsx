import appStore from "../lib/store/store";
import { addLoggedInUserData, toggleAuthentication } from "../lib/store/slices/userSlices";
import { NextResponse } from "next/server";

const validateAuthentication = () => {
    
    fetch("https://ecommerce.smitghelani.xyz/api/user/validateAuth")
        .then((response) => response.json())
        .then((data)=>{
            appStore.dispatch(addLoggedInUserData(data.currentUser))
            appStore.dispatch(toggleAuthentication(data.isAuthenticated))
            NextResponse.next()
        })
        .catch((error) => {
            console.log(error)
        })
}

export default validateAuthentication;