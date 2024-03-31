const ProductDetails = () => {
    return (
        <div className="container mx-auto mt-10">
            <div className="flex flex-col md:flex-row">
                <div className="md:flex-shrink-0">
                    <img className="rounded-lg md:w-56" src="product-image-url.jpg" alt="Product Name" />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                    <h1 className="text-xl font-bold text-gray-900">Product Name</h1>
                    <p className="mt-2 text-gray-600">This is a detailed description of the product. It includes all the benefits and features of the product. Explain why this product is worth purchasing.</p>
                    <div className="mt-3">
                        <span className="text-gray-500">Price:</span>
                        <span className="ml-1 text-gray-900 font-bold">£Price</span>
                    </div>
                    <div className="mt-6">
                        <button className="px-8 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-700">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;