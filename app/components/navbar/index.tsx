"use client"
import { addLoggedInUserData, removeLoggedInUser, returnState, toggleAuthentication } from "@/app/lib/store/slices/userSlices";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import destroyToken from "@/app/utils/destroyToken";

const Navbar = () => {
    const user = useSelector((state:any)=>state.user)
    const dispatch = useDispatch()
    const route = useRouter()

    useEffect(() => {
        fetch("https://ecommerce.smitghelani.xyz/api/user/validateAuth")
            .then((response) => response.json())
            .then((data)=>{
                dispatch(addLoggedInUserData(data.currentUser))
                dispatch(toggleAuthentication(data.isAuthenticated))
            })
            .catch((error)=> {
                console.log(error)
            })
    }, [dispatch])

    const logout = () => {
        dispatch(removeLoggedInUser())
        localStorage.removeItem("token");
        destroyToken();
        dispatch(toggleAuthentication(false))
        route.push("/")
    }
    
    return (
        <nav className="bg-black shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="-ml-2 mr-2 flex items-center">
                            <Link href="/" className="text-lg font-semibold text-gray-100">eCommerce Store</Link>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                    {
                        user.loggedIn && 
                        <div className="flex items-center">
                            <Link href="/products" className="text-gray-100  hover:bg-slate-300 p-3 hover:text-slate-900 rounded">Products</Link>
                        </div>
                    }
                    {
                            user.loggedIn && 
                        <div className="flex items-center">
                            <Link href="/orders" className="text-gray-100  hover:bg-slate-300 p-3 hover:text-slate-900 rounded">My Orders</Link>
                        </div>
                    }
                    {
                        user.loggedIn && 
                        <div className="flex items-center">
                            <Link href="/cart" className="text-gray-100  hover:bg-slate-300 p-3 hover:text-slate-900 rounded ">Cart</Link>
                        </div>
                    }
                    <div className="flex items-center">
                        {
                            user.loggedIn ? 
                            <button className="bg-slate-100 hover:bg-slate-700 hover:text-white text-black font-bold py-3 px-5 rounded-full"
                                onClick={()=>logout()}>
                                Logout
                            </button>
                            :
                            <Link href="/signin" className="text-gray-900 hover:text-gray-600">
                                <button className="bg-slate-100 hover:bg-slate-700 hover:text-white text-black font-bold py-3 px-5 rounded-full">
                                    Login
                                </button>
                            </Link>
                        }
                    </div>
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar;