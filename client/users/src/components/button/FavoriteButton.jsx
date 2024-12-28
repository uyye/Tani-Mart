import { useEffect, useState } from "react";
import "./button.css"
import { MdFavorite } from "react-icons/md";
import instance from "../../api/axiosInstance";

export default function FavoriteButton({productId}) {
    const [isFavorite, setIsFavorite] = useState(false)

    async function fetchFavoriteData() {
        try {
            const {data} = await instance({
                method:"get",
                url:`/favorites/${productId}`,
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            if (data === null) {
                setIsFavorite(false)
            }else{
                setIsFavorite(true)
            }
        } catch (error) {
            console.log(error);
            
        }

        
    }
    
    const toggleFavorite = async()=>{
        if(isFavorite){
            console.log(1);
            try {
                await instance({
                    method:"delete",
                    url:"/favorites",
                    data:{productId:productId},
                    headers:{
                        "Authorization":`bearer ${localStorage.getItem("access_token")}`
                    }
                })
                fetchFavoriteData()

            } catch (error) {
                console.log(error);
                
            }
        }else{
            console.log(2);
            
            try {
               await instance({
                    method:"post",
                    url:"/favorites",
                    data:{productId:productId},
                    headers:{
                        "Authorization":`bearer ${localStorage.getItem("access_token")}`
                    }
                })

                setIsFavorite((prev)=>!prev)
                
            } catch (error) {
                console.log(error);
                
            }
        }


        // try {
        //     await instance({
        //         method:"post",
        //         url:"/favorites/",
        //         data:{productId:productId},
        //         headers:{
        //             "Authorization":`bearer ${localStorage.getItem("access_token")}`
        //         }
        //     })

        //     setIsFavorite((prev)=> !prev)
        // } catch (error) {
        //     console.log(error);
        // }
    }

    useEffect(()=>{
        fetchFavoriteData()
    },[productId])

    return(
        <button className={`favorite-button ${isFavorite?"favorited":""}`} onClick={()=>toggleFavorite(productId)}><MdFavorite/></button>
    )
}