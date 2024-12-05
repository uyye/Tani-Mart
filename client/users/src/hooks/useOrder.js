import { useEffect, useState } from "react"
import instance from "../api/axiosInstance"

const useOrder = (id)=>{
    const [orderData, setOrderData] = useState({})

    const fetchOrderData = async()=>{
        try {
            const {data} = await instance({
                method:"get",
                url:`/orders/${id}`,
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            setOrderData(data)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        fetchOrderData()
    },[])

    return {orderData}
}

export default useOrder