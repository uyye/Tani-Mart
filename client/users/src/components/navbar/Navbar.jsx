import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";
import logo from "../../assets/logo siafarm.png";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <a href="#" className="logo-container">
        <img src={logo} alt="Siafarm Logo" className="logo" />
      </a>
      <div className={`navbar-nav ${isMenuOpen ? "active" : ""}`}>
        {localStorage.getItem("access_token") ? (
          <>
            <Link to="/">Beranda</Link>
            <Link to="/product">Produk</Link>
            <Link to="/pesananSaya">Pesanan Saya</Link>
            <Link to="/wishlist">Wishlist</Link>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="navbar-button1">
        {localStorage.getItem("access_token") ? (
          <>
            <Link to="/keranjang" id="shopping-cart-button">
              <CgShoppingCart />
            </Link>
            <Link to="/login" onClick={handleLogout} className="logout-button1">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Login Pembeli</Link>
            <Link to="/cms" className="login-penjual">
              Login Penjual
            </Link>
          </>
        )}
        <button
          id="hamburger-menu"
          onClick={toggleMenu}
          className="menu-button"
        >
          <CiMenuBurger />
        </button>
      </div>
    </nav>
  );
}
