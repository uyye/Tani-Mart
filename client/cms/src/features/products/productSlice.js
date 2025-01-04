import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        sort:"ASC",
        filter:"",
        search:""
    },
    reducers:{
        setProduct:(state, action)=>{
            state.products = action.payload
        },
        setSort: (state, action)=>{
            state.sort = action.payload
        },
        setFilter: (state, action)=>{
            state.filter = action.payload
        },
        setSearch: (state, action)=>{
            state.search = action.payload
        },
    }
})

export const {setProduct} = productSlice.actions
export const fetchDataProduct = ()=>{
    return async(dispatch, getState)=>{
        const {sort, filter, search} = getState().products
        const {data} = await instance({
            method:"get",
            url:"/products/",
            params:{
                sort,
                filter,
                search
            }
        })
        console.log(data, "DATA PRODUCTS");
        dispatch(setProduct(data))
    }
} 

export default productSlice.reducer