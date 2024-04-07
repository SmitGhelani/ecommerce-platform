"use client"
import { useEffect, useState } from "react"
import Card from "../components/card"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import axios, { AxiosResponse } from "axios"
import { Formik } from "formik"
import StoreProvider from "../storeProvider"

const Products = () => {

    const [productData, setProductData] = useState([])
    const [search,setSearch] = useState("")
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(12)

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
        <div className="flex flex-wrap flex-col"> 
            <div className="flex flex-row w-full">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative md:w-full m-4 flex flex-row">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" name="search" onChange={e=>setSearch(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products" required />
                </div>
            </div>
            <div className="flex flex-wrap flex-row w-full">
                {
                    productData && productData.slice(start,end).map((product,index)=>(
                        <Card key={index} productData={product}/>
                    ))
                }
            </div>
            <div className="flex grid-cols-3">
                <div className="flex w-full items-center text-center justify-center">
                    <button
			        	className="flex flex-row bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			        	onClick={() => {
			        		if (start >= 12) {
			        			setStart(start - 10);
			        			setEnd(end - 10);
			        		}
			        	}}
			        >
			        	Previous
			        </button>
                </div>
                <div className="flex flex-row w-full items-center text-center justify-center text-2xl font-bold">
                    {"   "}
			        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{start + 1} -{"   "}
			        {end}
                </div>
                <div className="flex w-full items-center text-center justify-center">
                    <button
			        	className="flex flex-row bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			        	onClick={() => {
			        		if (end <= 99) {
			        			setStart(start + 12);
			        			setEnd(end + 12);
			        		}
			        	}}
			        >
			        	Next
			        </button>
                </div>
                
            </div>
        </div>
    )
}

export default Products;