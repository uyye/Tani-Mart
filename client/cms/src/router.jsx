import { createBrowserRouter, redirect } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Index/>,
        loader:()=>{
            if(!localStorage.getItem("accessToken")){
                return redirect("/login")
            }
            return null
        },
        children:[
            {path:"", element:<Home/>},
        ]
    },
    {path:"/login", element:<Login/>},
    {path:"/register", element:<Register/>}
])

export default router