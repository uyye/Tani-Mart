import logo from "../../assets/logo siafarm.png";
import "./Navbar.css";
import { CiMenuBurger } from "react-icons/ci";
import { IoBagAdd } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.removeItem("access_token")
    navigate("/")
  }

  return (
    <nav className="navbar">
      <a href="#">
        <img src={logo} alt="Siafarm Logo" />
      </a>
      <div className="navbar-nav">
        {
          localStorage.getItem("access_token")?
          <>
            <Link to="/">Beranda</Link>
            <Link to="/product">Produk</Link>
            <Link to="/CekPresale">Presale</Link>
            <Link to="/order">Order</Link>
          </>:
            ""
        }
      </div>
      <div className="navbar-button1">
        {
          localStorage.getItem("access_token")?
          <>
            <Link to="/Input" id="AddProduct" alt="InputProduk" title="Input Produk" ><IoBagAdd /> </Link>
            <Link to="/InputPresale" id="InputPresale" alt="InputPresale" title="Input Presale"><MdOutlineAddShoppingCart /></Link>
            <Link to="/login" onClick={handleLogout} style={{backgroundColor:"#dc3545", color:"#ffff", border:"none"}}>Logout</Link>
          </>:
            <Link to="/login">Masuk</Link>
        }
        
        <a href="#" id="hamburger-menu"> <CiMenuBurger /></a>
      </div>
    </nav>
  );
}
