import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { CgShoppingCart } from "react-icons/cg";
import logo from "../../assets/logo siafarm.png";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <a href="#">
        <img src={logo} alt="Siafarm Logo" />
      </a>
      <div className="navbar-nav">
        {localStorage.getItem("access_token") ? (
          <>
            <Link to="/">Beranda</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/product">Produk</Link>
            <Link to="/pesananSaya">Pesanan Saya</Link>
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

            <Link
              to="/login"
              onClick={handleLogout}
              style={{
                backgroundColor: "#dc3545",
                color: "#ffff",
                border: "none",
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login">Masuk</Link>
        )}

        <a href="#" id="hamburger-menu">
          {" "}
          <CiMenuBurger />
        </a>
      </div>
    </nav>
  );
}
