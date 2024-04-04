import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";

const cartStore = configureStore({
    reducer: {
        cart: cartReducer
    }
})

export default cartStore;