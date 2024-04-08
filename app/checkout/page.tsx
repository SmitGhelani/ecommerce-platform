"use client"
import { useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import appStore from "../lib/store/store";
import { ItemInterface } from "../interfaces/itemInterface";

const Checkout = () => {

    const cart= useSelector((state:any) => state.cart)
    const user= useSelector((state:any) => state.user)
    const [cartError, setCartError] = useState("")
    const [cartSuccess, setCartSuccess] = useState("")
    const route = useRouter()

    const initialValues = {
      name: "",
      email: "",
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
      const response:AxiosResponse = await axios.post("http://localhost:3000/api/order",
      {
        "name": values.name,
        "email": values.email,
        "shippingAddress": values.shippingAddress,
        "orderDetails": cart.items,
        "totalCartValue": totalBillAmout(),
        "userDetails": {
            "_id": user.user._id
        }
      })

        if (!response.data.success){
          // route.push('/login');
          setCartError(response.data.message)
        }else{
          route.push("/checkout");
          setCartSuccess("Order Placed Successfully!!!");
          setTimeout(()=>{
            window.location.reload();
          }, 3000)
        }
    }

    return (
      <Formik initialValues={initialValues} validate={validate} onSubmit={placeOrder}>
      {
          (formik)=>{
              const {values, errors, touched, handleBlur, handleChange, handleSubmit} = formik;
              return(
                  <div className="container mx-auto mt-10">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-3/4 mr-2 bg-white p-5 shadow-md">
                        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2"
                              >Name</label>
                            <input
                              type="text"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Place Order
                            </button>
                          </div>
                        </form>
                      </div>
                      {cartError && cartError && (
                        <span style={{color:"red"}} className="error">{cartError}</span>
                      )}
                      {cartSuccess && cartSuccess && (
                        <span style={{color:"green"}} className="error">{cartSuccess}</span>
                      )}
                      {cart.items.length === 0 ? (
                          <h1>Your Cart is Empty!</h1>
                        ) :
                          <div className="md:w-1/4 ml-2 bg-white p-5 shadow-md">
                            <h3 className="text-xl font-bold mb-4">Your Order</h3>
                            <div className="mb-2">
                          {
                            cart.items.map((item:ItemInterface)=>(
                              <div key={item.product._id}>
                                <span className="text-gray-600">{item.product.product_name} x {item.quantity}</span>
                                <span className="float-right">£{item.product.price*item.quantity}</span> 
                              </div>
                            ))
                          }
                          </div>
                            <div className="border-t mt-4">
                              <div className="flex justify-between mt-4">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-lg">£{totalBillAmout()}</span>
                              </div>
                            </div>
                          </div>
                      }
                      </div>
                  </div>
                );
              }
            }
        </Formik>
    )
}

export default Checkout;