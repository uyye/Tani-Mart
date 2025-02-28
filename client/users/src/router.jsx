import { createBrowserRouter, redirect } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Produk from "./pages/produk/Produk";
import Presale from "./pages/presale/Presale";
import Keranjang from "./pages/keranjang/Keranjang";
import Detail from "./pages/detailProduk/Detail";
import Checkout from "./pages/checkout/checkout";
import Wishlist from "./pages/wishlist/wishlist";
import PesananSaya from "./pages/pesananSaya/PesananSaya";
import DetailOrder from "./pages/detailOrder/DetailOrder";
import LoginSeller from "./pages/login/LoginSeller";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/product", element: <Produk /> },
        { path: "/presale", element: <Presale /> },
        { path: "/keranjang", element: <Keranjang /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/detail/:id", element: <Detail /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/pesananSaya", element: <PesananSaya /> },
        { path: "/orders/:id", element: <DetailOrder /> },
        { path: "/seller", element: <LoginSeller /> },
      ],
    },

    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
