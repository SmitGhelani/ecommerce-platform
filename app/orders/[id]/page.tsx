"use client"
import { ItemInterface } from "@/app/interfaces/itemInterface";
import { OrderInterface } from "@/app/interfaces/orderInterface";
import validateAuthentication from "@/app/utils/validateAuthentication";
import { useEffect, useState } from "react";

const OrderDetails = ({params}: {params:{id:string}}) =>{

    const {id} = params
    const [orderData, setOrderData] = useState<OrderInterface>({
        _id: "",
        shippingAddress: "",
        orderSummary: [{
            product: {
                _id: "",
                features: {
                    Color: "",
                    Size: "",
                    Material: ""
                },
                product_name: "",
                description: "",
                price: 0,
                category: "",
                image: "",
                addedBy: "",
                createdAt: ""
            },
            quantity: 0
        }],
        orderTotalPrice: 0,
        userID: "",
        createdAt: ""
    })

    useEffect(()=>{
        
        validateAuthentication();

        fetch("https://${process.env.SECRET_KEY}/api/order/myOrders/orderDetail",{method:"POST",body:JSON.stringify({
            oid: id
        })}).then((response)=>response.json())
        .then((data)=>{
            setOrderData(data.myOrderDetail.orderDetails)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    const totalBillAmount = () => {
        let totalAmout = 0
        if (orderData){
            orderData.orderSummary.map((item:ItemInterface)=>{
                totalAmout = totalAmout + (item.product.price*item.quantity)
            })
        }
  
        return totalAmout
    }
  

    return (
        <div className="container mx-auto mt-10 mb-20 p-10">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold">Order #{orderData.orderSummary ? orderData._id : "" } Details</h1>
                </div>
                <div className="flex mb-4">
                    <div className="w-1/2 mr-2">
                        <h2 className="text-lg font-semibold">Shipping Information</h2>
                        <p>{orderData.orderSummary ? orderData.shippingAddress : ""}</p>
                    </div>
                    <div className="w-1/2 ml-2 ">
                        <h2 className="text-lg font-semibold">Billing Information</h2>
                        <p>{orderData ? orderData.shippingAddress: ""}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Order Items</h2>
                    <table className="min-w-full leading-normal mt-2">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Item
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderData && orderData.orderSummary.map((order,index)=>(
                                    <tr key={order.product._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {order.product.product_name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {order.quantity}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            £{order.product.price * order.quantity}
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end items-center">
                    <div className="text-xl font-semibold">
                        Total: £{totalBillAmount()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;