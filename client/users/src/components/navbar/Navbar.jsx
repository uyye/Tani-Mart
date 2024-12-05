import logo from "../../assets/logo siafarm.png";
import "./Navbar.css";
import { CiMenuBurger } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate()

  const handleLogoutButton = ()=>{
    localStorage.removeItem("access_token")
    navigate("/")
  }
  return (
    <nav className="navbar">
      <a href="#">
        <img src={logo} alt="Siafarm Logo" />
      </a>
      <div className="navbar-nav">
        <Link to="/">Beranda</Link>
        <Link to="/">Tentang Kami</Link>
        <Link to="/product">Produk</Link>
        <Link to="/presale">Presale</Link>
      </div>
      <div className="navbar-button1">
        {
          localStorage.getItem("access_token")?
          <Link to="/keranjang" id="shopping-cart-button"><CgShoppingCart /></Link>:
          ""
        }
        {
          localStorage.getItem("access_token")?
          <Link onClick={handleLogoutButton}>Logout</Link>:
          <Link to="/login">Masuk</Link>
        }
      </div>
        <a href="#" id="hamburger-menu"><CiMenuBurger /></a>
    </nav>
  );
}
