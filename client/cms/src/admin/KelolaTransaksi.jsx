import { useState } from "react";
import { Link } from "react-router-dom";
import "./KelolaTransaksi.css";
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
} from "lucide-react";

// Data dummy transaksi
const transaksiData = [
  {
    id: "T001",
    pembeli: "Budi Santoso",
    jumlahProduk: 3,
    totalHarga: 150000,
    status: "Selesai",
    tanggalOrder: "2024-01-20",
  },
  {
    id: "T002",
    pembeli: "Siti Rahmawati",
    jumlahProduk: 5,
    totalHarga: 250000,
    status: "Diproses",
    tanggalOrder: "2024-01-21",
  },
  {
    id: "T003",
    pembeli: "Agus Wijaya",
    jumlahProduk: 2,
    totalHarga: 100000,
    status: "Dibatalkan",
    tanggalOrder: "2024-01-22",
  },
];

export default function KelolaTransaksi() {
  const [transaksi, setTransaksi] = useState(transaksiData);
  const [activeMenu, setActiveMenu] = useState("Kelola Transaksi");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (label) => {
    if (label === "Logout") {
      alert("Logout berhasil!");
      return;
    }
    setActiveMenu(label);
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard Admin Siafarm",
      path: "/admin/dashboard",
    },
    { icon: ShoppingCart, label: "Pesanan", path: "/Pesanan" },
    { icon: Timer, label: "Presale", path: "/Presale" },
    { icon: Package, label: "Kelola Produk", path: "/kelolaproduk" },
    { icon: Users, label: "Kelola Pengguna", path: "/kelolapengguna" },
    { icon: Wallet, label: "Kelola Transaksi", path: "/kelolatransaksi" },
    { icon: LogOut, label: "Logout", path: "/logout" },
  ];

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
            <Link key={index} to={item.path}>
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

      {/* Konten Kelola Transaksi */}
      <div className="kelola-transaksi-container">
        <h2>Kelola Transaksi</h2>

        <table className="transaksi-table">
          <thead>
            <tr>
              <th>ID Transaksi</th>
              <th>Pembeli</th>
              <th>Jumlah Produk</th>
              <th>Total Harga</th>
              <th>Status</th>
              <th>Tanggal Order</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.pembeli}</td>
                <td>{item.jumlahProduk}</td>
                <td>Rp {item.totalHarga.toLocaleString()}</td>
                <td>{item.status}</td>
                <td>{item.tanggalOrder}</td>
                <td>
                  <Link
                    to={`/DetailTransaksi/${item.id}`}
                    className="btn-detail"
                  >
                    Detail
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
