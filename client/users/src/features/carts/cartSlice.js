import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";
import Swal from "sweetalert2";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        carts:{}
    },
    reducers:{
        setCart:(state, action)=>{
            state.carts = action.payload
        },
        addCartItem:(state, action)=>{
            state.carts.CartItems.push(action.payload)
        },
        removeCart:(state, action)=>{
            
            state.carts = {...state.carts,
                CartItems: state.carts.CartItems.filter(
                    (item) => item.id !== action.payload
                ),}
        }
    }
})

export const {setCart, addCartItem, removeCart} = cartSlice.actions;

export const fetchCart = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/carts/",
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            
            dispatch(setCart(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const PostCart = (productId, quantity)=>{
    return async (dispatch)=>{
        try {
           const {data} = await instance({
                method:"post",
                url:"/carts/",
                data:{
                    productId:productId,
                    quantity:quantity
                },
                headers:{
                    "Authorization":`beare ${localStorage.getItem("access_token")}`
                }
            })


            Swal.fire({
                icon: "success",
                showConfirmButton: false,
                title: "Success",
                text: `berhasil ditambahkan ke keranjang`,
                timer: 2000,
            })
            
            dispatch(addCartItem(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchRemoveCart =(itemId)=>{
    return async(dispatch)=>{
        try {
            await instance({
                method:"delete",
                url:"/carts/",
                data:{itemId:itemId},
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            dispatch(removeCart(itemId))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default cartSlice.reducer