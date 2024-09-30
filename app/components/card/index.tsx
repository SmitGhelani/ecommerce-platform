"use client"
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {addToCart, increaseQuantity, decreaseQuantity} from '@/app/lib/store/slices/cartSlice'
import { useEffect, useState } from "react";
import { ItemInterface } from "@/app/interfaces/itemInterface";

const Card = ({productData}:{productData:any}) => {
    const cart= useSelector((state:any) => state.cart)
    const [itemsInCart, setItemsInCart] = useState(0);
    const dispatch = useDispatch()

    useEffect(()=> {

        if (cart.items.length > 0){
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

    const validateDecrease = (itemcount:number, pid: string) =>{ 
        if (itemcount == 1) {
            const btn = document.getElementById(`addtocartbtn_${productData._id}`)
            const quantBtn = document.getElementById(`cartbtn_${productData._id}`)
            if(quantBtn && btn){
                btn.style.display = "none"
                quantBtn.style.display = "block"
            }
            dispatch(decreaseQuantity(pid))
        } else {
            dispatch(decreaseQuantity(pid))
        }
    }

    return (
        
            <div className="p-4 lg:w-1/4 md:w-1/2 rounded-full">
                <div className="bg-white shadow-sm rounded-md overflow-hidden">
                    <Link href={`/products/${productData && productData._id ? productData._id : ""}`} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                        <Image className="lg:h-48 md:w-96 w-full object-cover object-center" width={960} height={720}  src={productData && productData.image ? productData.image : "http://dummyimage.com/127x100.png/dddddd/000000"} alt="product name" />
                    </Link>
                    <div className="p-6 bg-zinc-700">
                    
                    <p className="text-base font-sm italic mb-1 bg-slate-200 rounded-full w-2/4 px-3 text-zinc-500">{productData && productData.category ? productData.category : ""}</p>
                    <h1 className="text-lg text-white font-semibold mb-3 line-clamp-1 text-4xl">{productData && productData.product_name ? productData.product_name : ""}</h1>
                    <p className="leading-relaxed mb-3 line-clamp-3 text-slate-400">{productData && productData.description ? productData.description : ""}</p>
                    <ul className="list-disc pl-9">
                        <li className="text-base font-medium mb-1 text-gray-300">{productData && productData.features ? productData.features.Color : ""}</li>
                        <li className="text-base font-medium mb-1 text-gray-300">{productData && productData.category ? productData.features.Size : ""}</li>
                        <li className="text-base font-medium mb-1 text-gray-300">{productData && productData.category ? productData.features.Material : ""}</li>
                    </ul>    
                    <div className="flex flex-row items-center justify-center text-center flex-wrap mt-6 bg-black rounded w-full">
                            <div className="w-2/4">
                                <button style={{display:"block"}}  onClick={()=>dispatch(addToCart(productData))} id={`cartbtn_${productData._id}`} className="px-4 py-2 text-white text-sm font-medium hover:bg-gray-300 hover:text-zinc-600 text-left align-left"><i className="fas fa-shopping-cart"></i>Add to Cart</button>
                                <div id={`addtocartbtn_${productData._id}`} style={{display:"none"}}>
                                <form className="max-w-xs mx-auto">
                                    <div className="relative flex items-center">
                                        <button type="button" onClick={()=>validateDecrease(itemsInCart, productData._id)} id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <input type="text" value={itemsInCart} onChange={()=>{}} id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                                        <button type="button" onClick={()=>dispatch(increaseQuantity(productData._id))} id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                                </div>
                            </div>
                            <div className="w-2/4 text-right">
                            <span className="text-gray-600 w-full items-center justify-center text-right mr-5 text-xl text-white">£{productData && productData.price ? productData.price : ""}</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Card;