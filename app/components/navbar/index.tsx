"use client"
import { returnState } from "@/app/lib/store/slices/userSlices";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
    const user = useSelector((state:any)=>state.user)
    const dispatch = useDispatch()
    console.log(user) 
    
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="-ml-2 mr-2 flex items-center">
                            <Link href="/" className="text-lg font-semibold text-gray-900">eCommerce Store</Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link href="/products" className="text-gray-900 hover:text-gray-600">Products</Link>
                    </div>
                    <div className="flex items-center">
                        <Link href="/orders" className="text-gray-900 hover:text-gray-600">My Orders</Link>
                    </div>
                    <div className="flex items-center">
                        <Link href="/cart" className="btn text-gray-900 hover:text-gray-600">Cart</Link>
                    </div>
                    <div className="flex items-center">
                        <Link href="/login" className="text-gray-900 hover:text-gray-600">Login</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;