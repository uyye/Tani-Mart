import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../features/orders/orderSlice"
import orderDetailSlice from "../features/orders/orderDetailSlice"

export const store = configureStore({
    reducer:{
        orders:orderSlice,
        orderDetail:orderDetailSlice
    }
})