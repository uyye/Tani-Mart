import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "../features/orders/orderSlice"
import orderDetailSlice from "../features/orders/orderDetailSlice"
import userSlice from "../features/users/userSlice"
import productSlice from "../features/products/productSlice"
import statisticSlice from "../features/statistic/statisticSlice"

export const store = configureStore({
    reducer:{
        orders:orderSlice,
        orderDetail:orderDetailSlice,
        users:userSlice,
        products:productSlice,
        statistics:statisticSlice
    }
})