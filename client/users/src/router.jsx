import { createBrowserRouter, redirect } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Produk from "./pages/produk/Produk";
import Presale from "./pages/presale/Presale";
import Keranjang from "./pages/keranjang/Keranjang";
import Detail from "./pages/detailProduk/Detail";
import Checkout from "./pages/checkout/Checkout";
import InputProduk from "./pages/inputProduk/InputProduk";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    // loader: () => {
    //   if (!localStorage.getItem("accessToken")) {
    //     return redirect("/login");
    //   }
    //   return null;
    // },
    children: [
      { path: "/", element: <Home /> },
      { path: "/product", element: <Produk /> },
      { path: "/presale", element: <Presale /> },
      { path: "/keranjang", element: <Keranjang /> },
      { path: "/detail", element: <Detail /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/inputProduk", element: <InputProduk /> },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  // { path: "/Produk", element: <Produk /> },
]);

export default router;
