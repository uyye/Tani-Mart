import {createSlice} from "@reduxjs/toolkit"
import instance from "../../api/axiosInstance"

const favoriteSlice = createSlice({
    name:"favorites",
    initialState:{
        favorites:[]
    },
    reducers:{
        setFavorites:(state, action)=>{
            state.favorites = action.payload
        },
        removeFavorite:(state, action)=>{
            state.favorites = state.favorites.filter(
                (favorite)=> favorite.Product.id !== action.payload
            )
        }
        
    }
})

export const {setFavorites, removeFavorite} = favoriteSlice.actions

export const fetchFavorites = ()=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:"/favorites",
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })
            
            dispatch(setFavorites(data))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchCreateFavorite = (productId)=>{
    return async(dispatch)=>{
        try {
            const {data} =await instance({
                method:"post",
                url:"/favorites",
                data:{productId},
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            dispatch(setFavorites)
            
            
        } catch (error) {
            console.log(error);
            
        }
    }
}

export const fetchRemoveFavorite = (productId)=>{
    return async (dispatch)=>{
        try {
            await instance({
                method:"delete",
                url:"/favorites",
                data:{productId:productId},
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            dispatch(removeFavorite(productId))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default favoriteSlice.reducer