import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
// import Produk from "../pages/produk/Produk";
export default function Index() {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      <Footer />
      {/* <Produk /> */}
    </>
  );
}
