import { UserInterface } from "@/app/interfaces/userInterface";
import { createSlice } from "@reduxjs/toolkit"



export interface UserState{
    user: UserInterface
}

const initialState:UserState = {
    user: {
        _id:"",
        name: "",
        email: "",
        password: "",
        role: "user",
        createdAt: ""
    }
}
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        addLoggedInUserEmail: (state, action)=>{
            if (state.user._id === "") {
                state.user.email = action.payload
            }
        },
        addLoggedInUserData: (state, action)=>{
            state.user = action.payload
        },
        removeLoggedInUser: (state) => {
            state.user = initialState.user
        },
        returnState: (state:any) => {
            return state.user
        }
    }
});

export const userReducer = userSlice.reducer

export const {addLoggedInUserEmail, addLoggedInUserData, removeLoggedInUser, returnState} = userSlice.actions
