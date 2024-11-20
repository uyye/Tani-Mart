import { createBrowserRouter, redirect } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import InputProduk from "./pages/inputProduk/InputProduk";
import InputPresale from "./pages/inputPresale/InputPresale";
// import Produk from "./pages/produk/Produk";

// import Keranjang from "./pages/keranjang/Keranjang";
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
      { path: "/Input", element: <InputProduk /> },
      { path: "/InputPresale", element: <InputPresale /> },
      // { path: "/product", element: <Produk /> },
      // { path: "/presale", element: <Presale /> },
      // { path: "/keranjang", element: <Keranjang /> },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  // { path: "/Produk", element: <Produk /> },
]);

export default router;
