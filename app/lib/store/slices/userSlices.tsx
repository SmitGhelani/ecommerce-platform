import { createSlice } from "@reduxjs/toolkit"

export interface UserInterface {
    _id: string,
    name: string,
    email: string, 
    password: string,
    role: string,
    createdAt: string
}

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
        addLoggedInUser: (state, action)=>{
            if (state.user._id === "") {
                state.user = action.payload
            }
        },
        removeLoggedInUser: (state) => {
            state.user = initialState.user
        }
    }
});

export const userReducer = userSlice.reducer

export const {addLoggedInUser, removeLoggedInUser} = userSlice.actions
