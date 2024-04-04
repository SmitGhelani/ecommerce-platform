"use client"
import { useEffect, useState } from "react"
import Card from "../components/card"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import axios, { AxiosResponse } from "axios"
import { Formik } from "formik"

const Products = () => {

    const [productData, setProductData] = useState([])
    const [search,setSearch] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:3000/api/products${
            search !== "" ? `?name=${search}` : ""
        }`)
        .then((response)=>{
            setProductData(response.data.products)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[search]);
    return (
        <div className="flex flex-wrap"> 
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative md:w-full m-4">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" name="search" onChange={e=>setSearch(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products" required />
            </div>
            
            {
                productData && productData.map((product,index)=>(
                    <Card key={index} productData={product}/>
                ))
            }
        </div>
    )
}

export default Products;