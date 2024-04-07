"use client"
import axios, { AxiosResponse } from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity, ItemInterface } from "@/app/lib/store/slices/cartSlice";

interface ProductInterface {
    features: {
        Color: string,
        Size: string,
        Material: string
    },
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    image: string,
    addedBy: string,
    createdAt: string
}

const ProductDetails = ({params}:{params:{id:string}}) => {

    const {id} = params
    const [productData, setProductData] = useState<ProductInterface>({
        features: {
            Color: "",
            Size: "",
            Material: ""
        },
        _id: "",
        name: "",
        description: "",
        price: 0,
        category: "",
        image: "",
        addedBy: "",
        createdAt: ""
    })

    const dispatch = useDispatch();

    const cart= useSelector((state:any) => state.cart)
    const [itemsInCart, setItemsInCart] = useState(0);

    useEffect(()=>{
        axios.post("http://localhost:3000/api/productDetails",
        {
            "id":id
        }).then((result)=>{
            if(!result.data.success){
                throw Error(result.data.message)
            }
            setProductData(result.data.product)

        }).catch((error)=>{
            console.log(error)
        })
    },[])

    useEffect(()=>{
        if (cart.items.length > 0){
            const itemfromCart = cart.items.find((item:ItemInterface)=>item.product._id == productData._id)
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
        <div className="container mx-auto mt-10">
            <div className="flex flex-col md:flex-row">
                <div className="md:flex-shrink-0">
                    <Image className="object-cover rounded-lg md:w-56" height="5000" width="5600" src={productData.image} alt="Product Name" />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                    <h1 className="text-xl font-bold text-gray-900">{productData.name}</h1>
                    <p className="mt-2 text-gray-600">{productData.description}</p>
                    <div className="mt-3">
                        <span className="text-gray-500">Price:</span>
                        <span className="ml-1 text-gray-900 font-bold">£{productData.price}</span>
                    </div>
                    <div className="mt-6">
                        <button style={{display:"block"}}  onClick={()=>dispatch(addToCart(productData))} id={`cartbtn_${productData._id}`} className="px-8 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-700">Add to Cart</button>
                        <div id={`addtocartbtn_${productData._id}`} style={{display:"none", width:"fit-content"}}>
                            <form className="max-w-xs mx-auto">
                                <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
                                <div className="relative flex items-center max-w-[8rem]">
                                    <button type="button" onClick={()=>dispatch(decreaseQuantity(productData._id))} id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                        </svg>
                                    </button>
                                    <input type="text" value={itemsInCart} onChange={()=> {}} id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                                    <button type="button" onClick={()=>dispatch(increaseQuantity(productData._id))} id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div></div>
            </div>
        </div>
    )
}

export default ProductDetails;