import {createSlice} from "@reduxjs/toolkit"
import instance from "../../api/axiosInstance"

const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orders:[],
        orderDetail:{}
    },
    reducers:{
        setOrder:(state, action)=>{
            state.orders = action.payload   
        },
        setOrderDetail:(state, action)=>{
            state.orderDetail = action.payload
        }
    }
})

export const {setOrder, setOrderDetail}= orderSlice.actions
export const  fetchDataOrder = ()=>{
    return async(dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/orders/seller",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("access_token")}`
                  }
                })
                console.log(data, "DATA DATA");
                
                dispatch(setOrder(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchAdminOrder = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/orders/admin",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("access_token")}`
                  }
            })
            console.log(data, "DATA TRANSACTION");
            
            dispatch(setOrder(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchOrderDetail = (id)=>{
    console.log(localStorage.getItem("access_token"));
    
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:`/orders/${id}`,
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            console.log(data, "INI DATA DETAIL PADA ORDER SLICE");
            dispatch(setOrderDetail(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}


export default orderSlice.reducer