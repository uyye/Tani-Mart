import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./KelolaProduk.css";
import { Plus, Eye } from "lucide-react";
import { FiSidebar } from "react-icons/fi";
import logo from "../assets/logo.png";
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
const products = [
  {
    id: "P001",
    name: "cabe Organik Premium",
    category: "sayur",
    price: "Rp 180.000",
    stock: 500,
    status: "Reguler",
    totalPayment: "Rp 90.000.000",
  },
  {
    id: "P002",
    name: "cengkeh",
    category: "Rempah",
    price: "Rp 95.000",
    stock: 300,
    status: "Presale",
    totalPayment: "Rp 28.500.000",
  },
  {
    id: "P003",
    name: "Jagung",
    category: "Buah",
    price: "Rp 1.500.000",
    stock: 100,
    status: "Reguler",
    totalPayment: "Rp 150.000.000",
  },
];

export default function KelolaProduk() {
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
  const [activeMenu, setActiveMenu] = useState("Dashboard Admin Siafarm");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="container">
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

      <div className="kelola-produk-container">
        <div className="header">
          <h2>Kelola Produk</h2>
        </div>
        <Link to="/tambah-produk">
          <button className="add-product-btn">
            <Plus size={16} /> Tambah Produk
          </button>
        </Link>
        <table className="produk-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Status</th>
              <th>Total Pembayaran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status ${product.status.toLowerCase()}`}>
                    {product.status}
                  </span>
                </td>
                <td>{product.totalPayment}</td>
                <td>
                  <Link to="/DetailProduk">
                    <button className="detail-btn">
                      <Eye size={16} /> Detail
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
