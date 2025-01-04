import React, { useEffect } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import logo from "../../assets/lgg.png";
import { Link } from "react-router-dom";

export default function Home() {
  console.log("hallo");

  useEffect(() => {
    const navbar = document.querySelector(".navbar-nav");
    const hamburger = document.querySelector("#hamburger-menu");
    const navLinks = document.querySelectorAll(".navbar-nav a"); // Select all links inside navbar

    // Toggle class active for hamburger menu
    if (hamburger) {
      hamburger.onclick = () => {
        navbar.classList.toggle("active");
      };
    }

    // Close the menu when clicking a link inside the navbar
    const handleLinkClick = () => {
      if (navbar && navbar.classList.contains("active")) {
        navbar.classList.remove("active");
      }
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    // Click outside sidebar to close it
    const handleClickOutside = (e) => {
      if (
        hamburger &&
        !hamburger.contains(e.target) &&
        navbar &&
        !navbar.contains(e.target)
      ) {
        navbar.classList.remove("active");
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, []);

  return (
    <div>
      <section className="hero" id="home">
        <div className="mask-container">
          <main className="content">
            <h1>
              Selamat Datang di <span>Siafarm</span>
            </h1>
            <p>Platform e-commerce hasil pertanian di Kecamatan Sinoa</p>
            {localStorage.getItem("access_token") ? (
              <Link to="/product" className="cta">
                Cek Produk/Presale
              </Link>
            ) : (
              <Link to="/login" className="cta">
                Masuk untuk memulai
              </Link>
            )}
          </main>
        </div>
      </section>
      {/* About component */}
      <section id="about" className="about">
        <h2>
          tentang <span>kami</span>
        </h2>
        <a href="#">
          <img src={logo} alt="Logo" />
        </a>
        <p>
          <br />
          &emsp;&emsp;&emsp;SIAFARM adalah platform e-commerce berbasis website
          yang dirancang untuk memfasilitasi jual beli hasil pertanian di
          Kecamatan Sinoa. Platform ini bertujuan untuk membantu petani
          menjangkau pasar yang lebih luas, mempermudah transaksi antara petani
          dan pembeli, serta meningkatkan aksesibilitas hasil pertanian. Dengan
          memanfaatkan teknologi, SIAFARM diharapkan dapat mendukung petani,
          khususnya yang memiliki keterbatasan dalam literasi digital, agar
          lebih mudah dalam menjual produknya secara online.
        </p>
      </section>
      <Card />
    </div>
  );
}
