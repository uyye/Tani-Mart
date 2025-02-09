import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star,
  ShoppingBag,
  Search,
  BarChart3,
  Users,
  Package,
  DollarSign,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./App.css";

// Mock data for demonstration
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Sayuran Organik Premium",
    description: "Sayuran segar langsung dari kebun",
    price: "Rp 45.000",
    image:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Buah-buahan Lokal",
    description: "Buah segar pilihan terbaik",
    price: "Rp 35.000",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Rempah Pilihan",
    description: "Rempah berkualitas tinggi",
    price: "Rp 25.000",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Beras Organik",
    description: "Beras premium kualitas terbaik",
    price: "Rp 75.000",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
  },
];

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

// Mock data for dashboard
const DASHBOARD_STATS = {
  dailySales: "Rp 2.5M",
  weeklySales: "Rp 15.2M",
  monthlySales: "Rp 45.8M",
  totalBuyers: 1250,
  activeProducts: 85,
  totalRevenue: "Rp 145.2M",
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdminApproval, setShowAdminApproval] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Cari produk pertanian..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <button
              onClick={() => setShowAdminApproval(true)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Admin Approval
            </button>
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
                <p className="stat-value">{DASHBOARD_STATS.dailySales}</p>
                <div className="stat-trend">
                  <ArrowUpRight size={16} />
                  <span>12% dari kemarin</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <Clock className="stat-icon" size={24} />
                  <h3>Penjualan Mingguan</h3>
                </div>
                <p className="stat-value">{DASHBOARD_STATS.weeklySales}</p>
                <div className="stat-trend">
                  <ArrowUpRight size={16} />
                  <span>8% dari minggu lalu</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <Users className="stat-icon" size={24} />
                  <h3>Total Pembeli</h3>
                </div>
                <p className="stat-value">{DASHBOARD_STATS.totalBuyers}</p>
                <div className="stat-trend">
                  <ArrowUpRight size={16} />
                  <span>25 pembeli baru</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-header">
                  <DollarSign className="stat-icon" size={24} />
                  <h3>Total Pendapatan</h3>
                </div>
                <p className="stat-value">{DASHBOARD_STATS.totalRevenue}</p>
                <div className="stat-trend">
                  <ArrowUpRight size={16} />
                  <span>15% bulan ini</span>
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
              {[1, 2, 3].map((item) => (
                <div key={item} className="approval-item">
                  <div className="approval-header">
                    <h3>Produk #{item}</h3>
                    <span className="pending-status">Menunggu Persetujuan</span>
                  </div>
                  <p>Petani mengajukan produk baru untuk dijual di platform.</p>
                  <div className="approval-actions">
                    <button className="approve-button">Setujui</button>
                    <button className="reject-button">Tolak</button>
                  </div>
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

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Produk Unggulan</h2>
            <div className="slider-controls">
              <button
                onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
                className="control-button"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    Math.min(FEATURED_PRODUCTS.length - 1, prev + 1)
                  )
                }
                className="control-button"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          <div className="products-grid">
            {FEATURED_PRODUCTS.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <span className="price">{product.price}</span>
                    <button className="cart-button">
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2>Tentang Siafarm</h2>
          <div className="features-grid">
            <div className="feature-card">
              <TrendingUp className="feature-icon" size={32} />
              <h3>Pertumbuhan Berkelanjutan</h3>
              <p>
                Mendukung pertumbuhan ekonomi petani lokal melalui platform
                digital yang inovatif.
              </p>
            </div>
            <div className="feature-card">
              <Star className="feature-icon" size={32} />
              <h3>Kualitas Terjamin</h3>
              <p>
                Setiap produk melalui proses seleksi ketat untuk memastikan
                kualitas terbaik.
              </p>
            </div>
            <div className="feature-card">
              <Package className="feature-icon" size={32} />
              <h3>Pengiriman Cepat</h3>
              <p>
                Sistem pengiriman yang efisien untuk menjaga kesegaran produk
                pertanian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="popular-section">
        <div className="container">
          <div className="section-header">
            <TrendingUp size={24} className="section-icon" />
            <h2>Produk Terlaris</h2>
          </div>
          <div className="products-grid">
            {POPULAR_PRODUCTS.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-meta">
                    <div className="rating">
                      <Star size={16} className="star-icon" />
                      <span>{product.rating}</span>
                    </div>
                    <div className="sales">
                      <ShoppingBag size={16} />
                      <span>{product.sales} terjual</span>
                    </div>
                  </div>
                  <span className="price">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
