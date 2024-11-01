"use client"
import { useEffect, useState } from "react"
import Card from "../components/card"
import validateAuthentication from "../utils/validateAuthentication"
import { useSelector } from "react-redux"

const Products = () => {

    const [productData, setProductData] = useState([])
    const [search,setSearch] = useState("")
    const [filter,setFilter] = useState("")
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(12)
    const productCategories = ["All", "Toys", "Sports", "Clothing", "HomeKitchen", "BabyProduct", "Games", "PetSupplies", "Jewelry", "Accessories", "ArtsCrafts"]
    const [productsCount, setProductsCount] = useState(0)
    const user = useSelector((state:any)=> state.user)

    useEffect(() => {
        validateAuthentication();
        
        if (filter == "All"){
            setFilter("")
        }

        fetch(`https://ecommerce.smitghelani.xyz/api/products${
            filter !=="" ? (search !== "" ? `?name=${search}&category=${filter}`: `?category=${filter}`) : (search !== "" ? `?name=${search}`: "")
        }`)
        .then((response)=> response.json())
        .then((data)=>{
            setProductData(data.products)
            setProductsCount(data.products.length)
            setStart(0)
            setEnd(12)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[search, filter, productsCount, user.user]);

    const setFilterClass = (e:any, type:any) => {
        if (type !== "All") {
            setFilter(type)
        } else{
            setFilter("")
        } 

        const checkbox = window.document.getElementById(`box-category-${type}`)
        const othercheckbox = window.document.getElementsByClassName(`box-category`)
        for(let i = 0; i < othercheckbox.length; i++) {
            othercheckbox[i]?.classList.remove("bg-slate-400")
        }
        checkbox?.classList.add("bg-slate-400");
    }
    
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
            <div className="flex flex-row w-full">
                <div className="flex flex-col align-center">
                    {
                        productCategories.map((type, index) => (
                            <div key={index} id={`box-category-${type}`} className="box-category flex items-center ps-4 border border-gray-300 rounded dark:border-gray-700 w-40 m-2 hover:text-white hover:bg-slate-500" onClick={(e)=>setFilterClass(e, type)}>
                                <input checked id={`category-${type}`} type="radio" value={type} name="category" className="w-4 h-4 text-black-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hidden" />
                                <label htmlFor={`category-${type}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{type}</label>
                            </div> 
                        ))
                    }
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-wrap flex-row w-full">
                        {
                            productData && productData.slice(start,end).map((product,index)=>(
                                <Card key={index} productData={product}/>
                            ))
                        }
                    </div>
                    <div className="flex grid-cols-3 m-5 bg-black rounded p-3 text-white">
                        <div className="flex w-full items-center text-center justify-center">
                            <button
			                	className="bg-white hover:bg-slate-500 hover:text-slate-100 text-black font-bold py-3 px-5 rounded"
			                	onClick={() => {
			                		if (start >= 12) {
			                			setStart(start - 12);
			                			setEnd(end - 12);
			                		}
			                	}}
			                >
			                	Previous
			                </button>
                        </div>
                        <div className="flex flex-row w-full items-center text-center justify-center text-2xl font-bold">
                            {"   "}
                            <div className="bg-white hover:bg-slate-500 hover:text-slate-100 text-black font-bold py-1.5 px-5 rounded">
			                {start + 1}
                            </div>
                            <div className="bg-white hover:bg-slate-500 hover:text-slate-100 text-black font-bold py-1.5 px-5 rounded mr-3 ml-3"> - </div>
			                <div className="bg-white hover:bg-slate-500 hover:text-slate-100 text-black font-bold py-1.5 px-5 rounded">{end > productsCount ? productsCount: end}</div>
                        </div>
                        <div className="flex w-full items-center text-center justify-center">
                            <button
			                	className="bg-white hover:bg-slate-500 hover:text-slate-100 text-black font-bold py-3 px-5 rounded"
			                	onClick={() => {
			                		if (end <= productsCount) {
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
            </div>
        </div>
    )
}

export default Products;