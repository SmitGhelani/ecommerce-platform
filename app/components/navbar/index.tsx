"use client"
import { removeLoggedInUser, returnState } from "@/app/lib/store/slices/userSlices";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import destroyToken from "@/app/utils/destroyToken";


const Navbar = () => {
    const user = useSelector((state:any)=>state.user)
    const dispatch = useDispatch()
    const route = useRouter()

    const logout = () => {
        destroyToken();
        route.push("/")
        dispatch(removeLoggedInUser())
    }
    
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="-ml-2 mr-2 flex items-center">
                            <Link href="/" className="text-lg font-semibold text-gray-900">eCommerce Store</Link>
                        </div>
                    </div>
                    {
                            user.user._id && 
                        <div className="flex items-center">
                            <Link href="/products" className="text-gray-900 hover:text-gray-600">Products</Link>
                        </div>
                    }
                    {
                            user.user._id && 
                        <div className="flex items-center">
                            <Link href="/orders" className="text-gray-900 hover:text-gray-600">My Orders</Link>
                        </div>
                    }
                    {
                        user.user._id && 
                        <div className="flex items-center">
                            <Link href="/cart" className="btn text-gray-900 hover:text-gray-600">Cart</Link>
                        </div>
                    }
                    <div className="flex items-center">
                        {
                            user.user._id ? 
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={()=>logout()}>
                                Logout
                            </button>
                            :
                            <Link href="/login" className="text-gray-900 hover:text-gray-600">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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