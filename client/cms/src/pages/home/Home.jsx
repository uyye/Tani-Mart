import React from "react";
import "./home.css";
import Card from "../../components/card/Card";
import logo from "../../assets/lgg.png";
import { Link } from "react-router-dom";
export default function Home() {
  console.log("hallo");

  // // Toggle class active untuk hamburger menu
  // const navbar = document.querySelector(".navbar-nav");
  // // ketika hamburger menu di klik
  // document.querySelector("#hamburger-menu").onclick = () => {
  //   navbar.classList.toggle("active");
  // };

  // // klik diluar sidebar
  // const hamburger = document.querySelector("#hamburger-menu");

  // document.addEventListener("click", function (e) {
  //   if (!hamburger.contains(e.target) && !navbar.contains(e.target)) {
  //     navbar.classList.remove("active");
  //   }
  // });
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
          <img src={logo} />
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
