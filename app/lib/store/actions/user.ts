import { createAsyncThunk } from "@reduxjs/toolkit";
import appStore from "../store";
import { addLoggedInUserData } from "../slices/userSlices";

export const getUserData = createAsyncThunk("/user/getUserData", async (email:string) => {
    const response:any = await fetch("https://${process.env.SECRET_KEY}/api/user",{method:"POST",body:JSON.stringify({email:email})});
    const user = await response.json()
    if (user.isAuthenticated) {
        appStore.dispatch(addLoggedInUserData(user.user))
        return user.isAuthenticated
    } else {
        return user.isAuthenticated
    }
    
})