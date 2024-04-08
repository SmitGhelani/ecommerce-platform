"use client"
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {addToCart, increaseQuantity, decreaseQuantity} from '@/app/lib/store/slices/cartSlice'
import { useEffect, useState } from "react";
import { ItemInterface } from "@/app/interfaces/itemInterface";

const Card = ({productData}:{productData:any}) => {
    const cart= useSelector((state:any) => state.cart)
    const dispatch = useDispatch();
    const [itemsInCart, setItemsInCart] = useState(0);

    useEffect(()=>{
        if (cart.items.length > 0){
            console.log(cart.items)
            const itemfromCart = cart.items.find((item:ItemInterface)=>item.product.productId == productData._id)
            if (itemfromCart){
                setItemsInCart(itemfromCart.quantity)
                const btn = document.getElementById(`addtocartbtn_${productData._id}`)
                const quantBtn = document.getElementById(`cartbtn_${productData._id}`)
                if(quantBtn && btn){
                    btn.style.display = "block"
                    quantBtn.style.display = "none"
                }
            }
        }
    }, [itemsInCart, cart, productData])

    return (
        
            <div className="p-4 lg:w-1/4 md:w-1/2">
                <div className="bg-white shadow-sm rounded-md overflow-hidden">
                    <Link href={`/products/${productData && productData._id ? productData._id : ""}`} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                        <Image className="lg:h-48 md:w-96 w-full object-cover object-center" width={960} height={720}  src={productData && productData.image ? productData.image : "http://dummyimage.com/127x100.png/dddddd/000000"} alt="product name" />
                    </Link>
                    <div className="p-6">
                        <h2 className="text-base font-medium text-indigo-600 mb-1">{productData && productData.category ? productData.category : ""}</h2>
                        <h1 className="text-lg font-semibold mb-3 line-clamp-1">{productData && productData.product_name ? productData.product_name : ""}</h1>
                        <p className="leading-relaxed mb-3 line-clamp-3">{productData && productData.description ? productData.description : ""}</p>
                        <div className="flex items-center flex-wrap ">
                            <div className="mt-6">
                                <button style={{display:"block"}}  onClick={()=>dispatch(addToCart(productData))} id={`cartbtn_${productData._id}`} className="px-8 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-700">Add to Cart</button>
                                <div id={`addtocartbtn_${productData._id}`} style={{display:"none"}}>
                                <form className="max-w-xs mx-auto">
                                    <div className="relative flex items-center max-w-[8rem]">
                                        <button type="button" onClick={()=>dispatch(decreaseQuantity(productData._id))} id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <input type="text" value={itemsInCart} onChange={()=>{}} id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                                        <button type="button" onClick={()=>dispatch(increaseQuantity(productData._id))} id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                                </div>
                            </div>
                            <span className="text-gray-600 ml-auto">£{productData && productData.price ? productData.price : ""}</span>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Card;