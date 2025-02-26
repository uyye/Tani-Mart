import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api/axiosInstance";

const userSlice = createSlice({
    name:"users",
    initialState:{
        users:[],
        detailUser:{}
    },
    reducers:{
        setUser:(state, action)=>{
            state.users = action.payload
        },
        setDetailUser:(state, action)=>{
            state.detailUser = action.payload
        },
        removeUser:(state, action)=>{
           state.users = state.users.filter((user)=> user.id !== action.payload)
        }
    }
})

export const {setUser, setDetailUser, removeUser} = userSlice.actions

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

export const fetchDetailUser = (id)=>{
    
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"get",
                url:`/users/detail/${id}`,
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`,
                }
            })
            
            dispatch(setDetailUser(data))
        } catch (error) {
            console.log(error);
            
        }
    }

}

export const fetchDeleteUser = (id)=>{
    return async (dispatch)=>{
        try {
            const {data} = await instance({
                method:"delete",
                url:`/users/${id}`,
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            dispatch(removeUser(id))
        } catch (error) {
            console.log(error);
            
        }
    }
}


export default userSlice.reducer