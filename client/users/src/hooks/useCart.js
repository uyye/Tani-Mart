import { useEffect, useState } from "react"
import instance from "../api/axiosInstance";

    const useCart = ()=>{
    const [cart, setCart]=useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const fetchCart = async()=>{
        try {
            const {data} =  await instance({
                method:"get",
                url:"/carts",
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })
            setCart(data)
            
        } catch (error) {
            setError("Gagal memuat data keranjang")
            console.log(error);
            
        } finally{
            setLoading(false)
        }

    }
    useEffect(()=>{
        fetchCart()
    }, [])

    return {cart, loading, error}
}

export default useCart