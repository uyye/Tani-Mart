import {createSlice} from "@reduxjs/toolkit"
import instance from "../../api/axiosInstance"

const favoriteSlice = createSlice({
    name:"favorites",
    initialState:{
        favorites:[],
        favorite:{}
    },
    reducers:{
        setFavorites:(state, action)=>{
            state.favorites = action.payload
        },
        setFavorite:(state, action)=>{
            state.favorite = action.payload
        },
        removeFavorite:(state, action)=>{
            state.favorites = state.favorites.filter(
                (favorite)=> favorite.Product.id !== action.payload
            ),
            state.favorite = state.favorite = {}
        }
        
    }
})

export const {setFavorites,setFavorite, removeFavorite} = favoriteSlice.actions

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

export const fetchFavoriteByProduct = (productId)=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:`/favorites/${productId}`,
                headers:{
                    "Authorization" :`bearer ${localStorage.getItem("access_token")}`
                }
            })

            dispatch(setFavorite(data))
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

            dispatch(setFavorite(data.data))
            
            
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