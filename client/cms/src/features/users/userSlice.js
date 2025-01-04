import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const userSlice = createSlice({
    name:"users",
    initialState:{
        users:[]
    },
    reducers:{
        setUser:(state, action)=>{
            state.users = action.payload
        }
    }
})

export const {setUser} = userSlice.actions
export const fetchDataUser = ()=>{
    return async (dispatch)=>{
        const {data} = await instance({
            method:"get",
            url:"/users/",
            headers:{
                "Authorization":`bearer ${localStorage.getItem("access_token")}`
            }
        })
        dispatch(setUser(data))
    }
}

export default userSlice.reducer