import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "../features/favorites/favoriteSlice"
import cartSlice from "../features/carts/cartSlice"

export const store = configureStore({
    reducer:{
        dataFavorites:favoriteSlice,
        dataCart:cartSlice

    }
})