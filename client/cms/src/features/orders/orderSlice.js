import {createSlice} from "@reduxjs/toolkit"
import instance from "../../api/axiosInstance"

const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orders:[],
        orderDetail:{},
        topOrder:[],
        adminOrder:[]
    },
    reducers:{
        setOrder:(state, action)=>{
            state.orders = action.payload   
        },
        setOrderDetail:(state, action)=>{
            state.orderDetail = action.payload
        },
        setTopOrder:(state, action)=>{
            state.topOrder = action.payload
        },
    }
})

export const {setOrder, setOrderDetail, setTopOrder, }= orderSlice.actions

//SELLER

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

export const fetchDataDetailOrder = (id)=>{
    
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:`/orders/seller/${id}`,
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            dispatch(setOrderDetail(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchTopOrderBySeller = ()=>{
    return async(dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/orders/topOrder",
                headers:{"Authorization":`bearer ${localStorage.getItem("access_token")}`}
            })

            dispatch(setTopOrder(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

// ADMIN

export const fetchOrderAdmin = ()=>{
    return async(dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/orders/admin",
                headers:{"Authorization":`bearer ${localStorage.getItem("access_token")}`}
            })

            dispatch(setOrder(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchAdminOrderDetail = (id)=>{
    return async(dispatch)=>{
        try {
            const { data } = await instance({
                method: "get",
                url: `/orders/${id}`,
                headers: {
                  Authorization: `bearer ${localStorage.getItem("access_token")}`,
                },
              });

              dispatch(setOrderDetail(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}


export default orderSlice.reducer