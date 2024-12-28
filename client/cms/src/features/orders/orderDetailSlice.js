import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const orderDetailSlice = createSlice({
    name:"detailOrder",
    initialState:{
        detailOrder:[]
    },
    reducers:{
        setDetailOrder:(state, action)=>{
            state.detailOrder = action.payload
        }
    }
})

export const {setDetailOrder} = orderDetailSlice.actions
export const fetchDataDetailOrder = (id)=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:`/orders/admin/${id}`,
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            dispatch(setDetailOrder(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default orderDetailSlice.reducer