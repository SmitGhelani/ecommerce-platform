"use client"

import Link from "next/link";

const Cart = () => {

    const removeItemFunction = () => {

    }

    return (
        <div>
            <div className="container mx-auto mt-10">
                <div className="flex shadow-md my-10">
                    <div className="w-full bg-white px-10 py-10">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                            <h2 className="font-semibold text-2xl">3 Items</h2>
                        </div>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Remove</h3>
                        </div>
                        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                            <div className="flex w-2/5">
                                <div className="w-20">
                                    <img className="h-24" src="product-image-url.jpg" alt="" />
                                </div>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                    <span className="font-bold text-sm">Product Name</span>
                                    <span className="text-red-500 text-xs">Product Category</span>
                                    <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                                </div>
                            </div>
                            <div className="flex justify-center w-1/5">
                                <input className="mx-2 border text-center w-8" type="text" value="1" />
                            </div>
                            <span className="text-center w-1/5 font-semibold text-sm">£Price</span>
                            <div className="flex justify-center w-1/5">
                                <button className="fill-current text-gray-500 w-4" onClick={()=>removeItemFunction}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-6 pt-6 border-t">
                            <div className="flex items-center">
                                <i className="fa fa-arrow-left text-sm pr-2"></i>
                                <Link href="/checkout" className="text-md font-medium text-indigo-500">Continue Shopping</Link>
                            </div>
                            <div className="flex justify-center items-end">
                                <span className="text-sm font-medium text-gray
                                -900">Subtotal:</span>
                                <span className="text-lg ml-3 font-bold text-gray-900">£Total</span>
                            </div>
                            <div className="flex">
                                <Link href="/checkout"><button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Checkout</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;