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
        }
    }
})

export const {setFavorites} = favoriteSlice.actions
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

export default favoriteSlice.reducer