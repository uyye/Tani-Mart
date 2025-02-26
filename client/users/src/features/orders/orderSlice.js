import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";
// import { useNavigate } from "react-router-dom";


const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orders:[],
        topOrders:[]
    },
    reducers:{
        setOrders:(state, action)=>{
            state.orders = action.payload
        },
        postOrder:(state, action)=>{
            state.orders
        },
        setTopOrder:(state, action)=>{
            console.log(action.payload, "BBBBBBBBBB");
            state.topOrders = action.payload
        }
    }
})


export const {setOrders, setTopOrder} = orderSlice.actions

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

export const fetchPostOrder = (request)=>{
    return async (dispatch)=>{
        try {
           const {data} = await instance({
                method:"post",
                url:"/orders",
                data: request,
                headers:{
                    "Authorization" :`bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "application/json"
                }
            })
            
            dispatch(fetchPaidOrder(data.newOrder?.id))
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchPaidOrder = (orderId)=>{
    // const navigate = useNavigate()
    return async(dispatch)=>{
        try {
            const payment = await instance({
                method:"post",
                url:"/payments",
                data:{orderId},
                headers:{
                    "Authorization" :`bearer ${localStorage.getItem("access_token")}`,
                }
            })
    
            window.snap.pay(payment.data?.token?.token, {
                onSuccess:async(result) => {
                    alert("Payment Success!");
                    await instance({
                        method:"post",
                        url:"/payments/webhooks",
                        headers:{
                            "Authorization": `bearer ${localStorage.getItem("access_token")}`
                        },
                        data:{
                            order_id:Number(result.order_id.split("-")[1]),
                            transaction_status: result.transaction_status
                        }
                      })
                },
                onPending:async(result) => {
                    alert("Waiting for your payment!");
                    await instance({
                        method:"post",
                        url:"/payments/webhooks",
                        headers:{
                            "Authorization": `bearer ${localStorage.getItem("access_token")}`
                        },
                        data:{
                            order_id:Number(result.order_id.split("-")[1]),
                            transaction_status: result.transaction_status
                        }
                      })
                },
                onError:async(result) => {
                    alert("Payment Failed!");
                    await instance({
                        method:"post",
                        url:"/payments/webhooks",
                        headers:{
                            "Authorization": `bearer ${localStorage.getItem("access_token")}`
                        },
                        data:{
                            order_id:Number(result.order_id.split("-")[1]),
                            transaction_status: result.transaction_status
                        }
                      })
                },
                onClose: () => {
                    alert("You closed the popup without finishing the payment");
                  },
            })

            // navigate("/pesananSaya")
        } catch (error) {
            console.log(error);
            
        }
        
    }
}

export const fetchTopOrder = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/orders/admin/topOrder"
            })            
            dispatch(setTopOrder(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export default orderSlice.reducer