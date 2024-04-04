"use client"
import { useRef } from "react"
import { Provider } from "react-redux";
import { cartStore } from "../lib/store";


export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef: any = useRef();
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}