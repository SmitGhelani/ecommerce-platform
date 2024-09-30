import { UserInterface } from "@/app/interfaces/userInterface";
import { createSlice } from "@reduxjs/toolkit"



export interface UserState{
    user: UserInterface,
    loggedIn: boolean
}

const initialState:UserState = {
    user: {
        _id:"",
        name: "",
        email: "",
        password: "",
        role: "user",
        createdAt: ""
    },
    loggedIn: false
}
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        toggleAuthentication: (state, action)=>{
            state.loggedIn = action.payload
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

export const {toggleAuthentication, addLoggedInUserData, removeLoggedInUser, returnState} = userSlice.actions
