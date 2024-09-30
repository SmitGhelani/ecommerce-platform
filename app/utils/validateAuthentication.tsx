import appStore from "../lib/store/store";
import { addLoggedInUserData, toggleAuthentication } from "../lib/store/slices/userSlices";
import { NextResponse } from "next/server";

const validateAuthentication = () => {
    
    fetch("http://localhost:3000/api/user/validateAuth")
        .then((response) => response.json())
        .then((data)=>{
            if (data.isAuthenticated) {
                appStore.dispatch(addLoggedInUserData(data.currentUser))
                appStore.dispatch(toggleAuthentication(data.isAuthenticated))
                NextResponse.next()
            } else {
                appStore.dispatch(toggleAuthentication(data.isAuthenticated))
                Response.redirect("/login")
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

export default validateAuthentication;