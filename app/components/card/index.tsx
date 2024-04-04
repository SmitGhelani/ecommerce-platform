import { wrap } from "module";
import Image from "next/image";
import Link from "next/link";

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

const Card = ({productData}:{productData:any}) => {

    return (
            <div className="p-4 lg:w-1/4 md:w-1/2">
                <div className="bg-white shadow-sm rounded-md overflow-hidden">
                    <Image className="lg:h-48 md:h-36 w-full object-cover object-center" width={100} height={36}  src={productData && productData.image ? productData.image : "http://dummyimage.com/127x100.png/dddddd/000000"} alt="product name" />
                    <div className="p-6">
                        <h2 className="text-base font-medium text-indigo-600 mb-1">{productData && productData.category ? productData.category : ""}</h2>
                        <h1 className="text-lg font-semibold mb-3">{productData && productData.name ? productData.name : ""}</h1>
                        <p className="leading-relaxed mb-3 line-clamp-3">{productData && productData.description ? productData.description : ""}</p>
                        <div className="flex items-center flex-wrap ">
                            <Link href={`/products/${productData && productData._id ? productData._id : ""}`} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </Link>
                            <span className="text-gray-600 ml-auto">£{productData && productData.price ? productData.price : ""}</span>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Card;