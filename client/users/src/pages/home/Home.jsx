import React, { useState, useEffect } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import logo from "../../assets/lgg.png";
import bg from "../../assets/bg.jpg";
import slider1 from "../../assets/slider1.png";
import slider2 from "../../assets/sl2.png";
import slider3 from "../../assets/slider3.png";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star,
  ShoppingBag,
} from "lucide-react";
import {useDispatch, useSelector} from "react-redux"
import { fetchTopOrder } from "../../features/orders/orderSlice";

// Mock data for demonstration
const FEATURED_PRODUCTS = [
  {
    id: 1,
    image: slider1,
  },
  {
    id: 2,
    image: slider3,
  },
  {
    id: 3,
    image: slider2,
  },
];

const POPULAR_PRODUCTS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&q=80&w=800",
    title: "Sayuran Organik",
    price: "Rp 25.000",
    rating: 4.8,
    sales: 956,
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&q=80&w=800",
    title: "Sayuran Organik",
    price: "Rp 25.000",
    rating: 4.8,
    sales: 956,
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&q=80&w=800",
    title: "Sayuran Organik",
    price: "Rp 25.000",
    rating: 4.8,
    sales: 956,
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&q=80&w=800",
    title: "Sayuran Organik",
    price: "Rp 25.000",
    rating: 4.8,
    sales: 956,
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&q=80&w=800",
    title: "Sayuran Organik",
    price: "Rp 25.000",
    rating: 4.8,
    sales: 956,
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch()
  const topProducts = useSelector((state)=>state.dataOrder.topOrders)

  console.log(topProducts, "CLCKCKCKCK");
  

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % FEATURED_PRODUCTS.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length
    );
  };

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

  // useEffect(() => {
  //   const timer = setInterval(nextSlide, 5000);
  //   return () => clearInterval(timer);
  // }, []);

  useEffect(()=>{
    dispatch(fetchTopOrder())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${bg})`, // Menggunakan gambar sebagai background
          backgroundSize: "cover", // Agar gambar menutupi seluruh area
          backgroundPosition: "center", // Posisi gambar di tengah
        }}
      >
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Selamat Datang di Siafarm</h1>
              <p className="hero-description">
                Platform e-commerce hasil pertanian di Kecamatan Sinoa
              </p>
              <Link to="/product">
                <button className="hero-button">Mulai Berbelanja</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Slider */}
      <section className="featured-section">
        <div className="container">
          <div className="slider-container">
            <div className="slider-wrapper">
              <div
                className="slider"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {FEATURED_PRODUCTS.map((product) => (
                  <div key={product.id} className="slide">
                    <div className="slide-content">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="slide-image"
                      />
                      <div className="slide-info">
                        <h3 className="slide-title">{product.title}</h3>
                        <p className="slide-price">{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={prevSlide} className="slider-button prev">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="slider-button next">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2>
            Tentang <span>Kami</span>
          </h2>
          <div className="about-content">
            {/* logo  */}
            <img src={logo} alt="Logo Siafarm" className="about-logo" />
            <p className="about-text">
              SIAFARM adalah platform e-commerce berbasis website yang dirancang
              untuk memfasilitasi jual beli hasil pertanian di Kecamatan Sinoa.
              Platform ini bertujuan untuk membantu petani menjangkau pasar yang
              lebih luas, mempermudah transaksi antara petani dan pembeli, serta
              meningkatkan aksesibilitas hasil pertanian.
            </p>
          </div>
        </div>
      </section>
      {/* card section */}
      <Card />
      {/* Popular Products */}
      <section className="popular-section">
        <div className="popular">
          <div className="section-header">
            <TrendingUp size={24} color="#059669" />
            <h2>
              Produk <span>Terlaris</span>
            </h2>
          </div>
          <div className="products-grid">
            {topProducts?.map((product) => (
              <div key={product.id} className="product-card1">
                <img
                  src={product?.image}
                  alt={product.name}
                  className="product-image1"
                />
                <div className="product-info">
                  <h3 className="product-title1">{product.name}</h3>
                  <p className="product-price1">{product.price}</p>
                  <div className="product-meta1">
                    <Star size={16} color="#FCD34D" />
                    <span>{product.rating}</span>
                    <span className="meta-separator">•</span>
                    <ShoppingBag size={16} />
                    <span>{product.totalQuantityOrder} terjual</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
