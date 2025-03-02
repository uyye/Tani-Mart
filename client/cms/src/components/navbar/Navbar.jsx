import React, { useState } from "react";
import logo from "../../assets/logo siafarm.png";
import "./Navbar.css";
import { CiMenuBurger } from "react-icons/ci";
import { IoBagAdd } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

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
      <a href="#">
        <img src={logo} alt="Siafarm Logo" />
      </a>
      <div className="navbar-nav">
        {localStorage.getItem("access_token") ? (
          <>
            <Link to="/">Beranda</Link>
            {/* <Link to="/#about">Tentang Kami</Link> */}
            <Link to="/product"> Produk saya</Link>
            <Link to="/order"> Cek order</Link>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="navbar-button1">
        {localStorage.getItem("access_token") ? (
          <>
            <Link
              to="/Input"
              id="AddProduct"
              alt="InputProduk"
              title="Input Produk & Presale"
            >
              <IoBagAdd />{" "}
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
