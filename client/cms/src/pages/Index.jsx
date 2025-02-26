import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { jwtDecode } from "jwt-decode";
// import Produk from "../pages/produk/Produk";
export default function Index() {

  const token = localStorage.getItem("access_token")
  const decode = jwtDecode(token)
  return (
    <>
      { decode.role === "seller" && <Navbar/>}
      <Outlet />
      { decode.role === "seller" && <Footer/>}
    </>
  );
}
