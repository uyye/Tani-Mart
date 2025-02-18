import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const statisticSlice = createSlice({
    name:"statistic",
    initialState:{
        salesStatistic:{}
    },
    reducers:{
        setStatistic:(state, action)=>{
            state.salesStatistic = action.payload
        }
    }
})

export const {setStatistic} = statisticSlice.actions
export const fetchSalesStatistic = ()=>{
    return async(dispatch)=>{
        const headers = {"Authorization":`bearer ${localStorage.getItem("access_token")}`}

        try {
            const [dailySales, weeklySales, monthlySales, dailyBuyer] = await Promise.all([
                instance.get("/payments/daily/sales", {headers}),
                instance.get("/payments/weekly/sales", {headers}),
                instance.get("/payments/monthly/sales", {headers}),
                instance.get("/payments/daily/buyer", {headers}),
            ])
    
            dispatch(setStatistic({
                dailySales:dailySales.data,
                weeklySales:weeklySales.data,
                monthlySales:monthlySales.data,
                dailyBuyer:dailyBuyer.data
            }))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default statisticSlice.reducer