import { ItemInterface } from "@/app/interfaces/itemInterface";
import { ProductInterface } from "@/app/interfaces/productInterface";
import { createSlice } from "@reduxjs/toolkit";

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
            const itemExists = state.items.find((item)=> item.product.productId == action.payload._id); 
            if(itemExists) {
                itemExists.quantity++;
            }else{
                state.items.push({product:{
                        productId: action.payload._id,
                        features: {
                            Color: action.payload.features.Color,
                            Size: action.payload.features.Size,
                            Material: action.payload.features.Material
                        },
                        product_name:action.payload.product_name,
                        description: action.payload.description,
                        price: action.payload.price,
                        category: action.payload.category,
                        image: action.payload.image,
                        addedBy:action.payload.addedBy,
                        createdAt: action.payload.createdAt
                    }, 
                    quantity:1
                });
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find((item)=> item.product.productId == action.payload)
            if(item) {
                item.quantity++;
            }
        },
        decreaseQuantity: (state, action) =>{
            const item = state.items.find((item)=>item.product.productId == action.payload)
            if(item) {
                if(item.quantity == 1) {
                    const index = state.items.findIndex((item)=>item.product.productId == action.payload)
                    state.items.splice(index, 1);
                } else {
                    item.quantity--;
                }
            }  
        },
        removeFromCart : (state, action) =>{
            const index = state.items.findIndex((item) =>  item.product.productId == action.payload)

            state.items.splice(index, 1)
        },
        destroyCart: (state, action) =>{
            state.items = initialState.items
        }
    }
})

export const cartReducer = cartSlice.reducer;

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions;

