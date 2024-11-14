import logo from "../../assets/logo siafarm.png";
import "./Navbar.css";
import { CiMenuBurger } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";
import { Link } from "react-router-dom";
export default function Navbar() {
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
        <Link to="/login">Masuk</Link>
        <Link to="/register" className="Daftar" type="button">
          Daftar
        </Link>
      </div>
      <div className="navbar-button2">
        <Link to="/keranjang" id="shopping-cart-button">
          <CgShoppingCart />
        </Link>
        <a href="#" id="hamburger-menu">
          <CiMenuBurger />
        </a>
      </div>
    </nav>
  );
}
