"use client"
import { Provider } from "react-redux";
import cartStore from "./lib/store/store";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={cartStore}>{children}</Provider>
    )
}

export default StoreProvider;