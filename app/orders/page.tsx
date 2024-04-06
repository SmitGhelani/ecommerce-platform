"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { ItemInterface } from "../lib/store/slices/cartSlice";
import axios from "axios";

export interface OrderInterface {
    _id: string,
    shippingAddress: string,
    orderSummary: ItemInterface[],
    orderTotalPrice: number,
    userID: string,
    orderNumber: string,
    createdAt: string
}
const Orders = () => {

    const [myOrders, setMyOrders] = useState<OrderInterface[]>([])
    useEffect(()=>{
        axios.post("http://localhost:3000/api/order/myOrders",{
            id: "6611680daba6d777fa3d342e"
        }).then((response)=> {
            setMyOrders(response.data.myOrders)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    const countTotalItems = (orderDetails:ItemInterface[]) => {
        let count = 0
        orderDetails.map((order)=>{
            count += order.quantity
        })

        return count
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white shadow-md rounded my-6">
                <table className="text-left w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Order Number</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Date</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Total</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Items</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders && myOrders.map((order)=>(
                                <tr key={order._id} className="hover:bg-grey-lighter">
                                    <td className="py-4 px-6 border-b border-grey-light">{order.orderNumber}</td>
                                    <td className="py-4 px-6 border-b border-grey-light">{order.createdAt}</td>
                                    <td className="py-4 px-6 border-b border-grey-light">£{order.orderTotalPrice}</td>
                                    <td className="py-4 px-6 border-b border-grey-light">{countTotalItems(order.orderSummary)}</td>
                                    <td className="py-4 px-6 border-b border-grey-light">
                                        <Link href={`/orders/${order._id}`} className="text-blue-500 hover:text-blue-800">View</Link>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders;