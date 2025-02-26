import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { FiSidebar } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Timer,
  Users,
  Wallet,
  LogOut,
  CheckSquare,
} from "lucide-react";

import "./SideNavbar.css";


export default function SideNavbar() {
    const [activeMenu, setActiveMenu] = useState("Dashboard Admin Siafarm");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
          label: "Approval",
          path: "/admin/AdminApproval",
        },
        { icon: Package, label: "Kelola Produk", path: "/kelolaproduk" },
        { icon: Users, label: "Kelola Pengguna", path: "/kelolapengguna" },
        // { icon: Wallet, label: "Kelola Transaksi", path: "/Kelolatransaksi" },
        { icon: LogOut, label: "Logout", path: "/login" },
      ];
    
      const handleMenuClick = (label) => {
        if (label === "Logout") {
          handleLogout();
          return;
        }
        setActiveMenu(label);
      };
    
      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

      const handleLogout = () => {
        const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
        if (confirmLogout) {
          localStorage.removeItem("access_token"); 
          navigate("/login");
        }
      };
    return(
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
    )
}