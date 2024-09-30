"use client"

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { removeFromCart } from "../lib/store/slices/cartSlice";
import { ItemInterface } from "../interfaces/itemInterface";

const Cart = () => {

    const cart= useSelector((state:any) => state.cart)

    const dispatch = useDispatch();

    const totalBillAmout = () => {
        let totalAmout = 0
        cart.items.map((item:ItemInterface)=>{
            totalAmout = totalAmout + (item.product.price*item.quantity)
        })

        return totalAmout
    }

    return (
        <div className="">
            <div className="container p-10">
                <div className="flex shadow-md my-10 bg-black">
                    <div className="w-full bg-zinc-800 text-slate-300 px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                            <h2 className="font-semibold text-2xl">{cart.items.length > 0 ? cart.items.length : 0} Items</h2>
                        </div>
                        {cart.items.length === 0 ? (
                                <h1>Your Cart is Empty!</h1>
                            ) : (
                                <>
                                    <div className="flex mt-10 mb-5 bg-white p-5 rounded">
                                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Remove</h3>
                                    </div>
                                    {cart.items.map((item:ItemInterface)=>(
                                        <div key={item.product.productId} className="flex items-center text-black bg-zinc-300 hover:bg-gray-100 hover:text-black p-5">
                                            <div className="flex w-2/5">
                                                <div className="w-20">
                                                    <Image className="h-24" width="100" height="30" src={item.product.image} alt="" />
                                                </div>
                                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                                    <span className="font-bold text-sm">{item.product.product_name}</span>
                                                    <span className="text-slate-700 text-xs">{item.product.category}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-center w-1/5">
                                                <input className="mx-2 border text-center text-slate-700 w-8" type="text" value={item.quantity} onChange={()=>{}} />
                                            </div>
                                            <span className="text-center w-1/5 font-semibold text-sm">£{item.product.price}</span>
                                            <div className="flex justify-center w-1/5">
                                                <button className="fill-current text-white bg-black rounded w-4" onClick={()=>dispatch(removeFromCart(item.product.productId))}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div className="flex justify-between items-center mt-6 pt-6 border-t">
                                        <div className="flex items-center text-slate-200">
                                            <i className="fa fa-arrow-left text-sm pr-2"></i>
                                            <Link href="/products" className="text-md font-medium text-slate-200">Continue Shopping</Link>
                                        </div>
                                        <div className="flex justify-center items-end">
                                            <span className="text-sm font-medium text-gray
                                            -900">Subtotal:</span>
                                            <span className="text-lg ml-3 font-bold text-gray-300">£{totalBillAmout()}</span>
                                        </div>
                                        <div className="flex">
                                            <Link href="/checkout"><button className="bg-white hover:bg-slate-500 hover:text-slate-100 text-black font-bold py-3 px-5 rounded">Checkout</button></Link>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;