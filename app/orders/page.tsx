"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { ItemInterface } from "../interfaces/itemInterface";
import { useDispatch, useSelector } from "react-redux";
import validateAuthentication from "../utils/validateAuthentication";
import { OrderInterface } from "../interfaces/orderInterface";
import formatDateTime from "../utils/formatDateTime";

const Orders = () => {

    const user = useSelector((state:any)=>state.user)
    const dispatch = useDispatch()
    
    const [myOrders, setMyOrders] = useState<OrderInterface[]>([])
    useEffect(()=>{
        validateAuthentication();

        fetch("http://localhost:3000/api/order/myOrders",{method:"POST",body:JSON.stringify({
            id: user.user._id
        })}).then((response)=> response.json())
        .then((data)=>{
            setMyOrders(data.myOrders)
        }).catch((error)=>{
            console.log(error)
        })
    },[user.user._id])

    const countTotalItems = (orderDetails:ItemInterface[]) => {
        let count = 0
        orderDetails.map((order)=>{
            count += order.quantity
        })

        return count
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="bg-white shadow-md rounded my-6 mx-8 text-slate-300">
                <table className="text-left w-full border-collapse bg-gray-700">
                    <thead>
                        <tr className="bg-black">
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-bold text-white border-b border-grey-light">Order Number</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-bold text-white border-b border-grey-light">Date</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-bold text-white border-b border-grey-light">Total</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-bold text-white border-b border-grey-light">Items</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-bold text-white border-b border-grey-light">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders && myOrders.map((order)=>(
                                <tr key={order._id} className="hover:bg-grey-lighter">
                                    <td className="py-4 px-6 border-b border-grey-light">{order._id}</td>
                                    <td className="py-4 px-6 border-b border-grey-light">{formatDateTime(order.createdAt)}</td>
                                    <td className="py-4 px-6 border-b border-grey-light">£{order.orderTotalPrice}</td>
                                    <td className="py-4 px-6 border-b border-grey-light">{countTotalItems(order.orderSummary)}</td>
                                    <td className="py-4 px-6 border-b border-grey-light">
                                        <Link href={`/orders/${order._id}`} className="text-zinc-400 hover:text-white">View</Link>
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