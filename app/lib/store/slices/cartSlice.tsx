import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
    items: any[]
} 

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        add(state, {type,payload}) {
            state.items.push(payload)
        },
        remove(state:any, {type,payload}:{type:string,payload:any[]}) {
            return state.items.filter((item:any) => item.id !== payload)
        }
    }
})

export const {add, remove} = cartSlice.actions;
export default cartSlice.reducer;