import React, { useState } from "react";
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
import "./Pesanan.css";
import logo from "../assets/logo.png";
import { FiSidebar } from "react-icons/fi";
const orders = [
  {
    id: "ORD001",
    customer: "Budi Santoso",
    products: ["Pupuk Organik Premium", "Bibit Unggul"],
    total: "Rp 2.500.000",
    status: "pending",
    date: "2024-03-15",
  },
  {
    id: "ORD002",
    customer: "Siti Aminah",
    products: ["Pestisida Alami"],
    total: "Rp 850.000",
    status: "processing",
    date: "2024-03-15",
  },
  {
    id: "ORD003",
    customer: "Ahmad Hidayat",
    products: ["Alat Pertanian", "Pupuk Organik Premium"],
    total: "Rp 3.200.000",
    status: "completed",
    date: "2024-03-14",
  },
  {
    id: "ORD003",
    customer: "Ahmad Hidayat",
    products: ["Alat Pertanian", "Pupuk Organik Premium"],
    total: "Rp 3.200.000",
    status: "completed",
    date: "2024-03-14",
  },
  {
    id: "ORD003",
    customer: "Ahmad Hidayat",
    products: ["Alat Pertanian", "Pupuk Organik Premium"],
    total: "Rp 3.200.000",
    status: "completed",
    date: "2024-03-14",
  },
  {
    id: "ORD003",
    customer: "Ahmad Hidayat",
    products: ["Alat Pertanian", "Pupuk Organik Premium"],
    total: "Rp 3.200.000",
    status: "completed",
    date: "2024-03-14",
  },
];

export default function Pesanan() {
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

  const [editOrder, setEditOrder] = useState(null);

  const handleEdit = (order) => {
    setEditOrder(order);
  };

  const handleSave = () => {
    // Simpan perubahan pesanan di sini (misalnya, update state atau kirim ke server)
    setEditOrder(null);
  };

  const handleCancel = () => {
    setEditOrder(null);
  };
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
        {/* Orders Table */}
        {editOrder ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Pesanan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">
                  ID Pesanan
                </label>
                <input
                  type="text"
                  value={editOrder.id}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Pelanggan</label>
                <input
                  type="text"
                  value={editOrder.customer}
                  onChange={(e) =>
                    setEditOrder({ ...editOrder, customer: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Status</label>
                <select
                  value={editOrder.status}
                  onChange={(e) =>
                    setEditOrder({ ...editOrder, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Daftar Pesanan
                </h2>
                <div className="flex gap-2">
                  <select className="border rounded-lg px-3 py-2">
                    <option>Semua Status</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-center border-b border-gray-200">
                      <th className="pb-3 font-medium text-gray-600">
                        ID Pesanan
                      </th>
                      <th className="pb-3 font-medium text-gray-600">
                        Pelanggan
                      </th>
                      <th className="pb-3 font-medium text-gray-600">Produk</th>
                      <th className="pb-3 font-medium text-gray-600">Total</th>
                      <th className="pb-3 font-medium text-gray-600">Status</th>
                      <th className="pb-3 font-medium text-gray-600">
                        Tanggal
                      </th>
                      <th className="pb-3 font-medium text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100">
                        <td className="py-4">{order.id}</td>
                        <td className="py-4">{order.customer}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <Package size={16} />
                            <span>{order.products.length} items</span>
                          </div>
                        </td>
                        <td className="py-4">{order.total}</td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4">{order.date}</td>
                        <td className="py-4">
                          <button>
                            <Link
                              to={`/admin/DetailPesanan/${order.id}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Detail
                            </Link>
                          </button>
                          {order.status !== "cancelled" && (
                            <button
                              onClick={() => handleEdit(order)}
                              className="ml-4 text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
