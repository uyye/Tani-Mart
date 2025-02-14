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

export const fetchPostOrder = (request)=>{
    console.log(request, "ABCD");
    
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

            console.log(data, "NEXT TO PAYMENT");
            
            const payment = await instance({
                method:"post",
                url:"/payments",
                data:{orderId:data.newOrder?.id},
                headers:{
                    "Authorization" :`bearer ${localStorage.getItem("access_token")}`,
                }
            })

            console.log("NEXT TO WEBHOOK");
            

            window.snap.pay(payment.data?.token?.token, {
                onSuccess:async(result) => {
                    alert("Payment Success!");
                    await instance({
                        method:"post",
                        url:"/payments/webhooks",
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
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default orderSlice.reducer