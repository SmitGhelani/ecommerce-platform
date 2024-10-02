"use client"
import { Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLoggedInUserData, toggleAuthentication } from "../lib/store/slices/userSlices";

interface RegisterInterface {
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string
}

const Signup = () => {
    const route = useRouter();
    const [signupError, setSignupError] = useState("");
    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const initialValues: RegisterInterface = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const validate = (values: any) => {
        let errors: any = {};
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
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password too short";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Does not match the Password";
        }
        return errors;
    };

    const submitForm = async (values: any) => {
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
            }),
        });
        const data = await response.json();

        if (!data.success) {
            setSignupError(data.message);
        } else {
            dispatch(addLoggedInUserData(data.currentUser));
            localStorage.setItem("loggedInUser", user.user);
            dispatch(toggleAuthentication(true));
            route.push('/');
        }
    };

    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm}>
            {(formik) => {
                const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;
                return (
                    <div className="flex items-center min-h-screen bg-zinc-300">
                        <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                            <div className="flex flex-col md:flex-row">
                                <div className="h-32 md:h-auto md:w-1/2">
                                    <Image
                                        className="object-cover w-full h-full"
                                        height="900"
                                        width="600"
                                        src="https://as1.ftcdn.net/v2/jpg/00/47/19/42/1000_F_47194226_wfWOZomCTunpr2C33YB5tER4LQLFtZQg.jpg"
                                        alt="Register"
                                    />
                                </div>
                                <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                                    <div className="w-full">
                                        <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                                            Create Your Account
                                        </h1>
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <label className="block text-sm font-medium">Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={values.name}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    className="block w-full h-5 p-5 mt-1 text-sm border-gray-800 rounded-md shadow-sm focus:border-grey-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    placeholder="John Doe"
                                                />
                                                {errors.name && touched.name && (
                                                    <span style={{ color: "red" }} className="error">
                                                        {errors.name}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                <label className="block text-sm font-medium">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    className="block w-full h-5 p-5 mt-1 text-sm border-gray-800 rounded-md shadow-sm focus:border-grey-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    placeholder="name@example.com"
                                                />
                                                {errors.email && touched.email && (
                                                    <span style={{ color: "red" }} className="error">
                                                        {errors.email}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                <label className="block text-sm font-medium">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    className="block w-full h-5 p-5 mt-1 text-sm border-gray-800 rounded-md shadow-sm focus:border-grey-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    placeholder="***************"
                                                    autoComplete="off"
                                                />
                                                {errors.password && touched.password && (
                                                    <span style={{ color: "red" }} className="error">
                                                        {errors.password}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-4">
                                                <label className="block text-sm font-medium">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={values.confirmPassword}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    className="block w-full h-5 p-5 mt-1 text-sm border-gray-800 rounded-md shadow-sm focus:border-grey-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    placeholder="***************"
                                                    autoComplete="off"
                                                />
                                                {errors.confirmPassword && touched.confirmPassword && (
                                                    <span style={{ color: "red" }} className="error">
                                                        {errors.confirmPassword}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-6">
                                                <button
                                                    type="submit"
                                                    className="w-full px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                                                >
                                                    Register
                                                </button>
                                            </div>
                                            {signupError && (
                                                <span style={{ color: "red" }} className="error">
                                                    {signupError}
                                                </span>
                                            )}
                                        </form>

                                        <p className="mt-4 text-xs text-center text-gray-600">
                                            Already have an account?{" "}
                                            <Link href="signin" className="text-slate-600 hover:underline">
                                                Login here
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

export default Signup;
