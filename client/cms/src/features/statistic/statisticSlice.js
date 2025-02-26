import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const statisticSlice = createSlice({
    name:"statistic",
    initialState:{
        salesStatistic:{},
        adminStatistic:[],
        dataChart:[],
        adminTopOrder:[]
    },
    reducers:{
        setStatistic:(state, action)=>{
            state.salesStatistic = action.payload
        },
        setDataChart:(state, action)=>{
            state.dataChart = action.payload
        },
        setAdminStatistic:(state, action)=>{
            state.adminStatistic = action.payload
        },
        setAdminTopOrder:(state, action)=>{
            state.adminTopOrder = action.payload
        }
    }
})

export const {setStatistic, setAdminStatistic, setDataChart, setAdminTopOrder } = statisticSlice.actions
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

//admin

export const fetchAdminCard= ()=>{
    return async(dispatch)=>{
        const headers = {"Authorization":`bearer ${localStorage.getItem("access_token")}`}
        const [commission, withdraw, totalOrder] = await Promise.all([
            instance.get("/payments/admin/daily/commission", {headers}),
            instance.get("/payments/admin/daily/withdraw", {headers}),
            instance.get("/orders/admin/daily", {headers}),
        ])

        
        dispatch(setAdminStatistic({
            commission:commission.data,
            withdraw:withdraw.data,
            totalOrder:totalOrder.data
        }))
    }
}

export const fetchChartData = ()=>{
    return async(dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/payments/admin/chart",
                headers:{"Authorization":`bearer ${localStorage.getItem("access_token")}`}
            })

            dispatch(setDataChart(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchAdminTopOrder=()=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/orders/admin/topOrder",
                headers:`bearer ${localStorage.getItem("access_token")}`
            })

            dispatch(setAdminTopOrder(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export default statisticSlice.reducer