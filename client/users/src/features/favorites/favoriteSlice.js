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
                (favorite)=> favorite.id !== action.payload
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

export const fetchRemoveFavorite = (id)=>{
    return async (dispatch)=>{
        try {
            await instance({
                method:"delete",
                url:"/favorites",
                data:{id:id},
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            dispatch(removeFavorite(id))
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default favoriteSlice.reducer