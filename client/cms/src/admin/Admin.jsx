import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FiSidebar } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Timer,
  Users,
  Wallet,
  LogOut,
  CheckSquare, // ikon untuk approval
} from "lucide-react";
// import { Routes, Route } from "react-router-dom";
// import Dashboard from "../admin/AdminMain";
// import Pesanan from "./Pesanan";
// import Presale from "./Presale";
// import KelolaProduk from "./KelolaProduk";
// import KelolaPengguna from "./KelolaPengguna";
// import Kelolatransaksi from "./KelolaTranksaksi";

// import { LineChart } from "../components/LineChart/LineChart";
import LineChart from "../components/LineChart/LineChart";

import "./baru.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard Admin Siafarm");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const orderStats = [
    {
      label: "Total Pesanan Hari Ini",
      value: "156",
      change: "+12%",
      trend: "up",
    },
    {
      label: "Pendapatan Hari Ini",
      value: "Rp 8.5M",
      change: "+8%",
      trend: "up",
    },
    { label: "Withdraw", value: "Rp 2.1M", change: "-5%", trend: "down" },
  ];

  const topProducts = [
    { name: "Pupuk Organik Premium", sales: 1234, revenue: "Rp 45.6M" },
    { name: "Bibit Unggul", sales: 856, revenue: "Rp 34.2M" },
    { name: "Pestisida Alami", sales: 654, revenue: "Rp 26.1M" },
    { name: "Alat Pertanian", sales: 432, revenue: "Rp 21.6M" },
  ];

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard Admin Siafarm",
      path: "/admin/dashboard",
    },
    { icon: ShoppingCart, label: "Pesanan", path: "/Pesanan" },
    { icon: Timer, label: "Presale", path: "/Presale" },
    {
      icon: CheckSquare,
      label: "Approval", // menu untuk persetujuan order
      path: "/admin/AdminApproval",
    },
    { icon: Package, label: "Kelola Produk", path: "/kelolaproduk" },
    { icon: Users, label: "Kelola Pengguna", path: "/kelolapengguna" },
    { icon: Wallet, label: "Kelola Transaksi", path: "/Kelolatransaksi" },
    { icon: LogOut, label: "Logout", path: "/login" },
  ];

  const handleMenuClick = (label) => {
    if (label === "Logout") {
      alert("Logout clicked");
      return;
    }
    setActiveMenu(label);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container-admin">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {isSidebarOpen && <img src={logo} alt="Siafarm Logo" />}
          <button className="toggle-button" onClick={toggleSidebar}>
            <FiSidebar />
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <button
                className={`nav-button ${
                  activeMenu === item.label ? "active" : ""
                }`}
                onClick={() => handleMenuClick(item.label)}
              >
                <item.icon
                  size={20}
                  className={
                    activeMenu === item.label ? "icon-active" : "icon-inactive"
                  }
                />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-container">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1 className="header-title">{activeMenu}</h1>
            <div className="header-actions">
              <div className="profile-container">
                <RiAdminFill />
                <span className="profile-name">Admin</span>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="main-content">
          {activeMenu === "Dashboard Admin Siafarm" && (
            <>
              {/* Stats Grid */}
              <div className="stats-grid">
                {orderStats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <h3 className="stat-label">{stat.label}</h3>
                    <div className="stat-value-container">
                      <span className="stat-value">{stat.value}</span>
                      <span className={`stat-change ${stat.trend}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="charts-grid">
                <div className="chart-card">
                  <h2 className="chart-title">Pendapatan Harian</h2>
                  <LineChart />
                </div>
                <div className="chart-card">
                  <h2 className="chart-title">Withdraw</h2>
                  <LineChart />
                </div>
              </div>

              {/* Top Products */}
              <div className="products-card">
                <div className="products-content">
                  <h2 className="products-title">Produk Terlaris</h2>
                  <div className="table-container">
                    <table className="products-table">
                      <thead>
                        <tr>
                          <th>Nama Produk</th>
                          <th>Penjualan</th>
                          <th>Pendapatan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topProducts.map((product, index) => (
                          <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.sales}</td>
                            <td>{product.revenue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeMenu !== "Dashboard Admin Siafarm" && (
            <div className="placeholder-content">
              <h2>Halaman {activeMenu}</h2>
              <p>
                {activeMenu === "Approval"
                  ? "Daftar order yang perlu disetujui oleh admin akan ditampilkan di sini. Order akan diproses setelah admin melakukan persetujuan."
                  : `Konten untuk halaman ${activeMenu} akan ditampilkan di sini.`}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
