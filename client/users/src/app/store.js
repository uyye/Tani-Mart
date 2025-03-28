import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "../features/favorites/favoriteSlice"
import cartSlice from "../features/carts/cartSlice"
import orderSlice from "../features/orders/orderSlice"
import productSlice from "../features/products/productSlice"

export const store = configureStore({
    reducer:{
        dataFavorites:favoriteSlice,
        dataCart:cartSlice,
        dataOrder:orderSlice,
        dataProducts:productSlice
    }
})