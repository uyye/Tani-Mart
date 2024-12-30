import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orders:[]
    },
    reducers:{
        setOrders:(state, action)=>{
            state.orders = action.payload
        },
        postOrder:(state, action)=>{
            state.orders
        }
    }
})

export const {setOrders} = orderSlice.actions

export const fetchOrder = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/orders",
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            dispatch(setOrders(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchPostOrder = ()=>{
    return async (dispatch)=>{
        try {
            await instance({
                method:"post",
                url:"/orders",
                data:{
                    
                }
            })
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default orderSlice.reducer