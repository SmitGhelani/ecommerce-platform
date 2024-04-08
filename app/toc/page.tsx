import Link from "next/link";

const TOC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold">Table of Contents</h1>
            <ul className="list-disc pl-5 mt-4">
                <li><Link href="index" className="text-blue-500 hover:underline">Home Page</Link></li>
                <li><Link href="products" className="text-blue-500 hover:underline">Products Page</Link></li>
                <li><Link href="product-detail" className="text-blue-500 hover:underline">Product Detail Page</Link></li>
                <li><Link href="cart" className="text-blue-500 hover:underline">Cart Page</Link></li>
                <li><Link href="orders" className="text-blue-500 hover:underline">Orders Page</Link></li>
                <li><Link href="order-details" className="text-blue-500 hover:underline">Order Detail Page</Link></li>
                <li><Link href="login" className="text-blue-500 hover:underline">Login Page</Link></li>
                <li><Link href="register" className="text-blue-500 hover:underline">Registration Page</Link></li>
                <li><Link href="checkout" className="text-blue-500 hover:underline">Checkout Page</Link></li>
            </ul>
        </div>
    )
}

export default TOC;