"use client"
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addLoggedInUserData, toggleAuthentication } from "../lib/store/slices/userSlices";

interface LoginInterface {
  email?: string;
  password?: string;
}

const Signin = () => {

    // const token = getToken()
    const route = useRouter();
    const [loginError, setLoginError] = useState("");
    const dispatch = useDispatch()
    const user = useSelector((state:any)=> state.user)

    const initialValues: LoginInterface = {
        email: "",
        password: ""
      };

    const validate = (values:any) => {
      let errors:any = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!regex.test(values.email)) {
        errors.email = "Invalid Email";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 4) {
        errors.password = "Password too short";
      }
      return errors;
    };
    const submitForm = async (values:any) => {
      const response = await fetch("https://ecommerce.smitghelani.xyz/api/login",{method:"POST",body:JSON.stringify({
            email: values.email,
            password: values.password
        })})

        const data = await response.json()

        if (!data.success){
          // route.push('/signin');
          setLoginError(data.message)
        }else{
          await dispatch(addLoggedInUserData(data.currentUser))
          await localStorage.setItem("loggedInUser", user.user)
          await dispatch(toggleAuthentication(true))
          route.push('/')
        }
    };

    return (
      <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm}>
      {
          (formik)=>{
              const {values, errors, touched, handleBlur, handleChange, handleSubmit} = formik;
              return(
                <div className="flex items-center min-h-screen bg-zinc-300">
                    <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                        <div className="flex flex-col md:flex-row">
                            <div className="h-32 md:h-auto md:w-1/2">
                                <Image className="object-cover w-full h-full" height="900" width="600" src="https://t4.ftcdn.net/jpg/04/60/71/01/240_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg" alt="Login" />
                            </div>
                            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                                <div className="w-full">
                                    <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">Login to Your Account</h1>
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label className="block text-sm font-medium">Email</label>
                                            <input type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className="block w-full h-5 p-5  mt-1 text-sm border-gray-800 rounded-md shadow-sm focus:border-grey-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="name@example.com" />
                                            {errors.email && touched.email && (
                                              <span style={{color:"red"}} className="error">{errors.email}</span>
                                            )}
                                        </div>
                                            
                                        <div className="mt-4">
                                            <label className="block font-medium">Password</label>
                                            <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className="block w-full h-5 p-5  mt-1 text-sm border-gray-800 rounded-md shadow-sm focus:border-grey-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="***************" autoComplete="off" />
                                            {errors.password && touched.password && (
                                              <span style={{color:"red"}} className="error">{errors.password}</span>
                                            )}
                                        </div>
                                            
                                        <div className="mt-6">
                                            <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300">
                                                Log in
                                            </button>
                                        </div>
                                        {loginError && loginError && (
                                          <span style={{color:"red"}} className="error">{loginError}</span>
                                        )}
                                    </form>
                                            
                                    <p className="mt-4 text-xs text-center text-gray-600">Do not have an account? <Link href="signup" className="text-zinc-800 hover:underline">Sign up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              );
          }}
      </Formik>
    )
}

export default Signin;