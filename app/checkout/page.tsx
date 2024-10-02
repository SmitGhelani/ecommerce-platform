"use client"
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ItemInterface } from "../interfaces/itemInterface";
import { destroyCart } from "../lib/store/slices/cartSlice";
import { error } from "console";

const Checkout = () => {

    const cart= useSelector((state:any) => state.cart)
    const user= useSelector((state:any) => state.user)
    const [cartError, setCartError] = useState("")
    const [cartSuccess, setCartSuccess] = useState("")
    const route = useRouter()
    const dispatch = useDispatch()

    const initialValues:{name:string, email: string, shippingAddress: string} = {
      name: user.user.name,
      email: user.user.email,
      shippingAddress: ""
    };

    const validate = (values:any) => {
      let errors:any = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.name) {
          errors.name = "Name is required";
      } else if (values.name.length < 4) {
          errors.name = "Name too short";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!regex.test(values.email)) {
        errors.email = "Invalid Email";
      }
      if (!values.shippingAddress) {
          errors.shippingAddress = "Shipping Address is required";
      } else if (values.shippingAddress.length < 8) {
          errors.shippingAddress = "Shipping Address too short";
      }
      return errors;
    };

    const totalBillAmout = () => {
      let totalAmout = 0
      cart.items.map((item:ItemInterface)=>{
          totalAmout = totalAmout + (item.product.price*item.quantity)
      })

      return totalAmout
    }

    const placeOrder = async (values: any) => {
      const response = await fetch("http://localhost:3000/api/order",{method:"POST",body:JSON.stringify({
        "name": values.name,
        "email": values.email,
        "shippingAddress": values.shippingAddress,
        "orderDetails": cart.items,
        "totalCartValue": totalBillAmout(),
        "userDetails": {
            "_id": user.user._id
        }
      })})
      
      const data = await response.json()

        if (!data.success){
          // route.push('/signin');
          setCartError(data.message)
        }else{
          setCartSuccess("Order Placed Successfully!!!");
          dispatch(destroyCart())
        }
    }

    return (
      <Formik initialValues={initialValues} validate={validate} onSubmit={placeOrder}>
      {
          (formik)=>{
              const {values, errors, touched, handleBlur, handleChange, handleSubmit} = formik;
              return(
                  <div className="container mx-auto p-10 mb-20">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-3/4 mr-2 bg-white p-5 shadow-md rounded">
                        <h2 className="text-2xl font-bold mb-6 text-slate-700">Checkout</h2>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                              >Name</label>
                            <input
                              type="text"
                              className="block w-full h-5 p-5  mt-1 text-sm border-gray-800 rounded-md shadow-sm focus:border-grey-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="John Doe"
                              required
                            />
                            {errors.name && touched.name && (
                              <span style={{color:"red"}} className="error">{errors.name}</span>
                            )}
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                              >Email Address
                            </label>
                            <input
                              type="email"
                              className="block w-full h-5 p-5  mt-1 text-sm border-gray-800 rounded-md shadow-sm focus:border-grey-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="you@example.com"
                              required
                            />
                          </div>
                          {errors.email && touched.email && (
                            <span style={{color:"red"}} className="error">{errors.email}</span>
                          )}
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                              >Shipping Address
                            </label>
                            <input
                              type="text"
                              className="block w-full h-5 p-5  mt-1 text-sm border-gray-800 rounded-md shadow-sm focus:border-grey-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                              name="shippingAddress"
                              value={values.shippingAddress}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="123 Main St"
                              required
                            />
                            {errors.shippingAddress && touched.shippingAddress && (
                              <span style={{color:"red"}} className="error">{errors.shippingAddress}</span>
                            )}
                          </div>
                          {/* <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                              >Payment Details</label
                            >
                            <div className="p-4 bg-gray-100 rounded-lg">
                              Payment form elements go here. (Integration with a payment
                              gateway is not required)
                            </div>
                          </div> */}
                          <div className="flex items-center justify-between">
                            <button
                              className="w-full px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                              type="submit"
                            >
                              Place Order
                            </button>
                          </div>
                        </form>
                      </div>
                      {cart.items.length === 0 ? (
                          <h1>Your Cart is Empty!</h1>
                        ) :
                          <div className="md:w-1/3 ml-2 bg-white p-5 shadow-md rounded">
                            <h3 className="text-xl font-bold mb-4">Your Order</h3>
                            <div className="mb-2">
                          {
                            cart.items.map((item:ItemInterface)=>(
                              <div key={item.product._id}>
                                <span className="block text-gray-700 text-sm font-bold mb-2"><p className="line-clamp-1" >{item.product.product_name}</p> x {item.quantity}</span>
                                <span className="block text-gray-700 text-sm font-bold mb-2">£{item.product.price*item.quantity}</span> 
                              </div>
                            ))
                          }
                          </div>
                            <div className="border-t mt-7">
                              <div className="flex justify-between mt-4">
                                <span className="block text-gray-700 text-lg font-bold mb-2">Total</span>
                                <span className="block text-gray-700 text-lg font-bold mb-2">£{totalBillAmout()}</span>
                              </div>
                            </div>
                          </div>
                      }
                      </div>
                      {cartError && cartError && (
                        <span style={{color:"red"}} className="error">{cartError}</span>
                      )}
                      {cartSuccess && cartSuccess && (
                        <span style={{color:"green"}} className="error">{cartSuccess}</span>
                      )}
                  </div>
                );
              }
            }
        </Formik>
    )
}

export default Checkout;