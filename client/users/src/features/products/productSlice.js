import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const productSlice = createSlice({
    name:"products",
    initialState:{
        products:[],
        search:"",
        filter:"",
        product:{}
    },
    reducers:{
        setProducts:(state, action)=>{
            state.products = action.payload
        },
        setFilter:(state, action)=>{
            state.filter = action.payload
        },
        setSearch:(state, action)=>{
            state.search = action.payload
        },
        setProduct:(state, action)=>{
            state.product = action.payload
        }
    }
})

export const {setProducts, setFilter, setSearch, setProduct} = productSlice.actions

export const fetchDataProduct = ()=>{
    return async (dispatch, getState)=>{
        const {search, filter} = getState().dataProducts
        try {
            const {data} = await instance({
                method:"get",
                url:"/products",
                params:{search, filter}
            })
            
            console.log(data, "><><><><");
            
            dispatch(setProducts(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchDetailProduct = (id)=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:`products/${id}`
            })

            dispatch(setProduct(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export default productSlice.reducer