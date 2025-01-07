import { createBrowserRouter, redirect } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import InputProduk from "./pages/inputProduk/InputProduk";
import InputPresale from "./pages/inputPresale/InputPresale";
import CekPresale from "./pages/cekPresale/CekPresale";
import Produk from "./pages/produk/Produk";
import AdminDashboard from "./admin/Admin";
import Order from "./pages/order/Order";
import OrderDetail from "./pages/orderDetail/OrderDetail";
import KelolaPengguna from "./admin/KelolaPengguna";
import KelolaProduk from "./admin/KelolaProduk";
import KelolaTranksaksi from "./admin/KelolaTranksaksi";
import DetailPengguna from "./admin/DetailPengguna";
import DetailProduk from "./admin/DetailProduk";
import DetailTranksaksi from "./admin/DetailTranksaksi";
import {jwtDecode} from "jwt-decode";
import AdminMain from "./admin/AdminMain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return redirect("/login");
      }

      return null; 
    },
    children: [
      { path: "/", element: <Home /> },
      { path: "/#about", element: <about /> },
      { path: "/Input", element: <InputProduk page="add" /> },
      { path: "/Input/:id", element: <InputProduk page="edit" /> },
      { path: "/InputPresale", element: <InputPresale /> },
      { path: "/CekPresale", element: <CekPresale /> },
      { path: "/product", element: <Produk /> },
      { path: "/order", element: <Order /> },
      { path: "/order/:id", element: <OrderDetail /> },
      
    ],
  },

  {
    path:"/admin",
    element:<AdminMain/>,
    loader: ()=>{
      const token = localStorage.getItem("access_token")

      if(!token){
        return redirect("/login")
      }

      const decode =  jwtDecode(token)
      console.log(decode, "cek");
      
      if (decode.role !== "admin") {
        return redirect("/")
      }

      return null
    },
    children:[
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/KelolaPengguna", element: <KelolaPengguna /> },
      { path: "/admin/KelolaProduk", element: <KelolaProduk /> },
      { path: "/admin/KelolaTranksaksi", element: <KelolaTranksaksi /> },
      { path: "/admin/DetailPengguna/:id", element: <DetailPengguna /> },
      { path: "/admin/DetailProduk/:id", element: <DetailProduk /> },
      { path: "/admin/DetailTranksaksi", element: <DetailTranksaksi /> },
    ]
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
