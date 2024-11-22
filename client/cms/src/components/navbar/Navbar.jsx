import logo from "../../assets/logo siafarm.png";
import "./Navbar.css";
import { CiMenuBurger } from "react-icons/ci";
import { IoBagAdd } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";

import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#">
        <img src={logo} alt="Siafarm Logo" />
      </a>
      <div className="navbar-nav">
        <Link to="/">Beranda</Link>
        <Link to="/product">Produk</Link>
        <Link to="/CekPresale">Presale</Link>
        <Link to="/order">Order</Link>
      </div>
      <div className="navbar-button1">
        <Link to="/login">Masuk</Link>
        <Link to="/register" className="Daftar" type="button">
          Daftar
        </Link>
      </div>
      <div className="navbar-button1">
        <Link
          to="/Input"
          id="AddProduct"
          alt="InputProduk"
          title="Input Produk"
        >
          <IoBagAdd />
        </Link>
        <a
          href="/InputPresale"
          id="InputPresale"
          alt="InputPresale"
          title="Input Presale"
        >
          <MdOutlineAddShoppingCart />
        </a>
        <a href="#" id="hamburger-menu">
          <CiMenuBurger />
        </a>
      </div>
    </nav>
  );
}
