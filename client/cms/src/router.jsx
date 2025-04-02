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
import KelolaTransaksi from "./admin/KelolaTransaksi";
import DetailProduk from "./admin/DetailProduk";
import DetailTransaksi from "./admin/DetailTransaksi";
import { jwtDecode } from "jwt-decode";
import AdminMain from "./admin/AdminMain";
import Pesanan from "./admin/Pesanan";
import Presale from "./admin/Presale";
import DetailPesanan from "./admin/detailPesanan";
import EditPresale from "./admin/editPresale";
import DetailPengguna from "./admin/DetailPengguna";
import AdminApproval from "./admin/AdminApproval";
import WithdrawPage from "./pages/withdraw/WithdrawPage";
import AdminWithdrawValidationPage from "./admin/AdminWithdrawValidationPage";
import AdminProductApprovalPage from "./admin/AdminProductApprovalPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return redirect("/login");
      }

      const decode = jwtDecode(token)
      if (decode.role === "admin") {
        return redirect("/admin/dashboard")
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
      { path: "/kelolaproduk", element: <KelolaProduk /> },
      { path: "/Pesanan", element: <Pesanan /> },
      { path: "/Presale", element: <Presale /> },
      { path: "/KelolaPengguna", element: <KelolaPengguna /> },
      { path: "/KelolaProduk", element: <KelolaProduk /> },
      { path: "/KelolaTransaksi", element: <KelolaTransaksi /> },
      { path: "/DetailProduk", element: <DetailProduk /> },
      { path: "/DetailTransaksi", element: <DetailTransaksi /> },
      { path: "/admin/DetailPesanan/:id", element: <DetailPesanan /> },
      { path: "/admin/Presale/:id", element: <Presale /> },
      { path: "/admin/editPresale", element: <EditPresale /> },
      { path: "/admin/DetailPengguna", element: <DetailPengguna /> },
      { path: "/admin/AdminApproval", element: <AdminApproval /> },
      { path: "/WithdrawPage", element: <WithdrawPage /> },
      {
        path: "/AdminWithdrawValidationPage",
        element: <AdminWithdrawValidationPage />,
      },
      {
        path: "/AdminProductApprovalPage",
        element: <AdminProductApprovalPage />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminMain />,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        return redirect("/login");
      }

      const decode = jwtDecode(token);
      console.log(decode, "cek");

      if (decode.role !== "admin") {
        return redirect("/");
      }

      return null;
    },
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/KelolaPengguna", element: <KelolaPengguna /> },
      { path: "/admin/KelolaProduk", element: <KelolaProduk /> },
      { path: "/admin/kelolaTransaksi", element: <KelolaTransaksi /> },
      { path: "/admin/DetailProduk/:id", element: <DetailProduk /> },
      { path: "/admin/DetailTransaksi", element: <DetailTransaksi /> },
      { path: "/admin/Pesanan", element: <Pesanan /> },
      { path: "/admin/pesanan/:id", element: <DetailPesanan /> },
      { path: "/admin/Presale", element: <Presale /> },
      { path: "/admin/editPresale", element: <EditPresale /> },
      { path: "/admin/DetailPengguna/:id", element: <DetailPengguna /> },
      { path: "/admin/approval", element: <AdminApproval /> }, 
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
