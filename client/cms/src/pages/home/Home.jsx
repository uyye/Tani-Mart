import React, { useState, useEffect } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import logo from "../../assets/lgg.png";
import { Link } from "react-router-dom";
import slider1 from "../../assets/slider2cms.png";
import slider2 from "../../assets/slider1cms.png";
import slider3 from "../../assets/slider3cms.png";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star,
  ShoppingBag,
  BarChart3,
  Users,
  DollarSign,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesStatistic } from "../../features/statistic/statisticSlice";
import { fetchTopOrderBySeller } from "../../features/orders/orderSlice";
import { fetchRequestProduct } from "../../features/products/productSlice";

// Mock data untuk slider
const FEATURED_PRODUCTS = [
  { id: 1, image: slider1 },
  { id: 2, image: slider2 },
  { id: 3, image: slider3 },
];

// Mock data untuk produk populer
const POPULAR_PRODUCTS = [
  {
    id: 1,
    name: "Sayuran Organik",
    description: "Sayuran segar berkualitas",
    price: "Rp 25.000",
    rating: 4.8,
    sales: 956,
    image:
      "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Buah Lokal",
    description: "Buah segar dari petani",
    price: "Rp 30.000",
    rating: 4.7,
    sales: 847,
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Rempah Tradisional",
    description: "Rempah asli Indonesia",
    price: "Rp 15.000",
    rating: 4.9,
    sales: 1234,
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Beras Premium",
    description: "Beras kualitas terbaik",
    price: "Rp 50.000",
    rating: 4.6,
    sales: 678,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdminApproval, setShowAdminApproval] = useState(false);

  const dispatch = useDispatch();
  const dataStatistic = useSelector((state) => state.statistics.salesStatistic);
  const topOrder = useSelector((state) => state.orders.topOrder);
  const requestData = useSelector((state) => state.products.requestData);

  console.log(requestData);

  // State untuk daftar approval, dengan status awal "Menunggu Persetujuan"
  const [approvalList, setApprovalList] = useState([
    { id: 1, status: "Menunggu Persetujuan" },
    { id: 2, status: "Menunggu Persetujuan" },
    { id: 3, status: "Menunggu Persetujuan" },
  ]);

  const handleOpenModal = () => {
    setShowAdminApproval(true);
    dispatch(fetchRequestProduct());
  };

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
    const navLinks = document.querySelectorAll(".navbar-nav a");

    if (hamburger) {
      hamburger.onclick = () => {
        navbar.classList.toggle("active");
      };
    }

    const handleLinkClick = () => {
      if (navbar && navbar.classList.contains("active")) {
        navbar.classList.remove("active");
      }
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

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

  useEffect(() => {
    dispatch(fetchSalesStatistic());
    dispatch(fetchTopOrderBySeller());
  }, [dispatch]);
  return (
    <div className="coba">
      <div className="diatas">
        <div className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              {/* <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Cari produk pertanian..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div> */}
              <div className="buttonApproval">
                <button
                  onClick={handleOpenModal}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Admin Approval
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Hero Section with Dashboard */}
        <section className="hero">
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content">
                <div className="hero-text">
                  <h1>Selamat Datang di Siafarm</h1>
                  <p>Platform e-commerce hasil pertanian di Kecamatan Sinoa</p>
                  <Link to="/product">
                    <button className="hero-button">
                      Cek Produk Reguler/Presale
                    </button>
                  </Link>
                </div>
              </div>

              {/* Dashboard Stats */}
              <div className="dashboard-grid">
                <div className="stat-card">
                  <div className="stat-header">
                    <BarChart3 className="stat-icon" size={24} />
                    <h3>Penjualan Harian</h3>
                  </div>
                  <p className="stat-value">
                    Rp.
                    {dataStatistic?.dailySales?.totalDailySales.toLocaleString()}
                  </p>
                  <div className="stat-trend">
                    <ArrowUpRight size={16} />
                    <span>
                      {dataStatistic?.dailySales?.totalDailyPercentage} % dari
                      kemarin
                    </span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <Clock className="stat-icon" size={24} />
                    <h3>Penjualan Mingguan</h3>
                  </div>
                  <p className="stat-value">
                    Rp.
                    {dataStatistic?.weeklySales?.totalWeeklySales.toLocaleString()}
                  </p>
                  <div className="stat-trend">
                    <ArrowUpRight size={16} />
                    <span>
                      {dataStatistic?.weeklySales?.totalWeeklyPercentage} % dari
                      minggu lalu
                    </span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <Users className="stat-icon" size={24} />
                    <h3>Total Pembeli</h3>
                  </div>
                  <p className="stat-value">
                    {dataStatistic?.dailyBuyer?.totalBuyer}
                  </p>
                  <div className="stat-trend">
                    <ArrowUpRight size={16} />
                    <span>
                      {dataStatistic?.dailyBuyer?.dailyBuyer} pembeli baru
                    </span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <DollarSign className="stat-icon" size={24} />
                    <h3>Total Pendapatan</h3>
                  </div>
                  <p className="stat-value">
                    Rp.
                    {dataStatistic?.monthlySales?.totalMonthlySales.toLocaleString()}
                  </p>
                  <div className="stat-trend">
                    <ArrowUpRight size={16} />
                    <span>
                      {dataStatistic?.monthlySales?.totalMonthlyPercentage} %
                      bulan ini
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Admin Approval Modal */}
        {showAdminApproval && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Admin Approval</h2>
              <div className="approval-list">
                {requestData?.map((item) => (
                  <div key={item.id} className="approval-item">
                    <div className="approval-header">
                      <h3>#{item.name}</h3>
                      <span
                        className={`approval-status ${
                          item.permission === "waiting"
                            ? "waiting"
                            : item.permission === "Pending"
                            ? "pending"
                            : "approved"
                        }`}
                      >
                        {item.permission}
                      </span>
                    </div>
                    <p>Mengajukan produk baru untuk dijual di platform.</p>
                    {/* <div className="approval-actions">
                      <button
                        className="approve-button"
                        onClick={() => handleApprove(item.id)}
                      >
                        Setujui
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => handleReject(item.id)}
                      >
                        Tolak
                      </button>
                    </div> */}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowAdminApproval(false)}
                className="close-button"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Featured Products Slider */}
      <section className="featured-section">
        <div className="containerslider">
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
                        alt={`Slide ${product.id}`}
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
      <section className="about-section1">
        <div className="atas">
          <h2>
            Tentang <span>Kami</span>
          </h2>
          <div className="about-content">
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

      {/* Card Section */}
      <div className="card">
        <Card />
      </div>

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
            {topOrder?.map((product) => (
              <div key={product.id} className="product-card1">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="product-image1"
                />
                <div className="product-info">
                  <h3 className="product-title">
                    {product.productName?.toLocaleString()}
                  </h3>
                  <p className="product-price">
                    Rp.{product.productPrice?.toLocaleString()} /kg
                  </p>
                  <div className="product-meta">
                    <Star size={16} color="#FCD34D" />
                    <span>{product.rating}</span>
                    <span className="meta-separator">
                      {product.totalQuantityOrder}
                    </span>
                    <ShoppingBag size={16} />
                    <span>{product.sales} terjual</span>
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
