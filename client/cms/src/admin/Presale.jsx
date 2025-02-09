import { useState } from "react";

import "./Presale.css";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Timer,
  Search,
  Plus,
  Users,
  Wallet,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiSidebar } from "react-icons/fi";
const presaleItems = [
  {
    id: "PRE001",
    product: "Pupuk Organik Premium Plus",
    startDate: "2024-03-20",
    endDate: "2024-04-20",
    price: "Rp 180.000",
    normalPrice: "Rp 220.000",
    stock: 500,
    sold: 125,
    status: "active",
  },
  {
    id: "PRE002",
    product: "Bibit Unggul Spesial",
    startDate: "2024-03-25",
    endDate: "2024-04-25",
    price: "Rp 95.000",
    normalPrice: "Rp 120.000",
    stock: 300,
    sold: 50,
    status: "upcoming",
  },
  {
    id: "PRE003",
    product: "Paket Alat Pertanian Premium",
    startDate: "2024-02-15",
    endDate: "2024-03-15",
    price: "Rp 1.500.000",
    normalPrice: "Rp 1.800.000",
    stock: 100,
    sold: 100,
    status: "ended",
  },
];

export default function Presale() {
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
    { icon: Package, label: "Kelola Produk", path: "/kelolaproduk" },
    { icon: Users, label: "Kelola Pengguna", path: "/kelolapengguna" },
    { icon: Wallet, label: "Kelola Transaksi", path: "/Kelolatransaksi" },
    { icon: LogOut, label: "Logout", path: "/logout" },
  ];
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
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

      <div className="space-y-6">
        {/* Presale Items */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Daftar Presale
              </h2>
              <div className="flex gap-2">
                <select className="border rounded-lg px-3 py-2">
                  <option>Semua Status</option>
                  <option>Active</option>
                  <option>Upcoming</option>
                  <option>Ended</option>
                </select>
              </div>
            </div>
            <div className="grid gap-6">
              {presaleItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.product}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <Timer size={16} />
                        <span>
                          {item.startDate} - {item.endDate}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "active"
                          ? "bg-green-100 text-green-800"
                          : item.status === "upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Harga Presale</p>
                      <p className="font-semibold text-green-600">
                        {item.price}
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        {item.normalPrice}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Stok</p>
                      <p className="font-semibold">{item.stock}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Terjual</p>
                      <p className="font-semibold">{item.sold} </p>
                    </div>
                    <div className="flex items-end">
                      <Link to="/admin/editPresale">
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit Presale
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
