import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminApproval.css";
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
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiSidebar } from "react-icons/fi";
const AdminApproval = () => {
  const navigate = useNavigate();

  // Fungsi untuk menangani persetujuan produk
  const handleApprove = (id) => {
    alert(`Produk #${id} telah disetujui.`);
    // Tambahkan logika untuk update status produk, misalnya melalui API
  };

  // Fungsi untuk menangani penolakan produk
  const handleReject = (id) => {
    alert(`Produk #${id} telah ditolak.`);
    // Tambahkan logika untuk update status produk, misalnya melalui API
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard Admin Siafarm");
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
    { icon: LogOut, label: "Logout", path: "/logout" },
  ];
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="admin-approval-page">
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
            <Link to={item.path}>
              <button
                key={index}
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

      <div className="approval-container">
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
                <button
                  className="approve-button"
                  onClick={() => handleApprove(item)}
                >
                  Setujui
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleReject(item)}
                >
                  Tolak
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => navigate(-1)} className="close-button">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default AdminApproval;
