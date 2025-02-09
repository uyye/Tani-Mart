import { useState } from "react";
import { Link } from "react-router-dom";
import "./KelolaPengguna.css";
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

const usersData = [
  {
    id: "U001",
    name: "Budi Santoso",
    phone: "081234567890",
    role: "Admin",
  },
  {
    id: "U002",
    name: "Siti Rahmawati",
    phone: "082345678901",
    role: "Penjual",
  },
  {
    id: "U003",
    name: "Agus Wijaya",
    phone: "083456789012",
    role: "Pembeli",
  },
];

export default function KelolaPengguna() {
  const [users, setUsers] = useState(usersData);
  const [activeMenu, setActiveMenu] = useState("Dashboard Admin Siafarm");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    alert("Pengguna berhasil dihapus!");
  };

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
    { icon: Wallet, label: "Kelola Transaksi", path: "/Kelolatransaksi" },
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

      {/* Konten Kelola Pengguna */}
      <div className="kelola-pengguna-container">
        <h2>Kelola Pengguna</h2>

        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>No HP</th>
              <th>Peran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link
                      to={{
                        pathname: "/admin/DetailPengguna",
                      }}
                      state={{ user }} // Mengirim data pengguna ke halaman detail
                      className="btn-detail"
                    >
                      Detail
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Tidak ada data pengguna.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
