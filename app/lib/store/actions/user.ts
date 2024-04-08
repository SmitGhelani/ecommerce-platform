import { createAsyncThunk } from "@reduxjs/toolkit";
import appStore from "../store";
import { addLoggedInUserData, addLoggedInUserEmail } from "../slices/userSlices";

export const getUserData = createAsyncThunk("/user/getUserData", async (email:string) => {
    const response:any = await fetch("http://localhost:3000/api/user",{method:"POST",body:JSON.stringify({email:email})});
    const user = await response.json()
    appStore.dispatch(addLoggedInUserData(user.loggedInUser))
})