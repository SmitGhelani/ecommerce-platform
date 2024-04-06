import { ProductInterface } from "@/app/components/card";
import { createSlice } from "@reduxjs/toolkit";

export interface ItemInterface {
    product: ProductInterface,
    quantity: number
}

export interface CartState {
    items: ItemInterface[]
}

const initialState:CartState = {
    items: []
}

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemExists = state.items.find((item)=> item.product._id == action.payload._id); 
            if(itemExists) {
                itemExists.quantity++;
            }else{
                state.items.push({product:action.payload, quantity:1});
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find((item)=> item.product._id == action.payload)
            if(item) {
                item.quantity++;
            }
        },
        decreaseQuantity: (state, action) =>{
            const item = state.items.find((item)=>item.product._id == action.payload)
            if(item) {
                if(item.quantity == 1) {
                    const index = state.items.findIndex((item)=>item.product._id == action.payload)
                    state.items.splice(index, 1);
                } else {
                    item.quantity--;
                }
            }  
        },
        removeFromCart : (state, action) =>{
            const index = state.items.findIndex((item) =>  item.product._id == action.payload)

            state.items.splice(index, 1)
        },
        destroyCart: (state, action) =>{
            state.items = initialState.items
        }
    }
})

export const cartReducer = cartSlice.reducer;

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;

