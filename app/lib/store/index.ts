import { configureStore } from "@reduxjs/toolkit";
impoer * as cartReducer from "./slices";

const cartStore = configureStore({
    reducer: {
        cart: cartReducer
    }
})

export default cartStore;