"use client"
import axios, { AxiosResponse } from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/lib/store/slices/cartSlice";

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

    return (
        <div className="container mx-auto mt-10">
            <div className="flex flex-col md:flex-row">
                <div className="md:flex-shrink-0">
                    <Image className="rounded-lg md:w-56" height="800" width="560" src={productData.image} alt="Product Name" />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                    <h1 className="text-xl font-bold text-gray-900">{productData.name}</h1>
                    <p className="mt-2 text-gray-600">{productData.description}</p>
                    <div className="mt-3">
                        <span className="text-gray-500">Price:</span>
                        <span className="ml-1 text-gray-900 font-bold">£{productData.price}</span>
                    </div>
                    <div className="mt-6">
                        <button  onClick={()=>dispatch(addToCart(productData))} className="px-8 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-700">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;