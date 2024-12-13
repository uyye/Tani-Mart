import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";
import logo from "../../assets/logo siafarm.png";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleLogoutButton = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div className="navbar-container" onClick={closeSidebar}>
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <a href="#">
          <img src={logo} alt="Siafarm Logo" />
        </a>
        <div className={`navbar-nav ${isSidebarVisible ? "visible" : ""}`}>
          <Link to="/">Beranda</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/product">Produk</Link>
          <Link to="/pesananSaya">Pesanan Saya</Link>
        </div>
        <div className="navbar-button1">
          {localStorage.getItem("access_token") ? (
            <Link to="/keranjang" id="shopping-cart-button">
              <CgShoppingCart />
            </Link>
          ) : (
            ""
          )}
          {localStorage.getItem("access_token") ? (
            <Link onClick={handleLogoutButton}>Logout</Link>
          ) : (
            <Link to="/login">Masuk</Link>
          )}
        </div>
        <a href="#navbar-nav" id="hamburger-menu" onClick={toggleSidebar}>
          <CiMenuBurger />
        </a>
      </nav>
    </div>
  );
}
