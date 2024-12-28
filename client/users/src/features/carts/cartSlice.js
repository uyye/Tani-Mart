import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        carts:{}
    },
    reducers:{
        setCart:(state, action)=>{
            state.carts = action.payload
        },
        addCartItem:(state, action)=>{
            state.carts.push(action.payload)
        }
    }
})

export const {setCart, addCartItem} = cartSlice.actions;

export const fetchCart = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/carts/",
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            
            dispatch(setCart(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const PostCart = (productId, cartId)=>{
    return async (dispatch)=>{
        try {
            await instance({
                method:"post",
                url:"/carts/",
                data:{
                    productId:productId,
                    quantity:cartId
                },
                headers:{
                    "Authorization":`beare ${localStorage.getItem("access_token")}`
                }
            })

            dispatch(addCartItem(""))
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default cartSlice.reducer