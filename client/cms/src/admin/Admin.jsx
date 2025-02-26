import React, { useEffect, useState } from "react";
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
  CheckSquare,
} from "lucide-react";
import LineChart from "../components/LineChart/LineChart";

import "./baru.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminCard, fetchAdminTopOrder } from "../features/statistic/statisticSlice";
import SideNavbar from "../components/sideNavbar/SideNavbar";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard Admin Siafarm");

  const dispatch = useDispatch()
  const dataCard = useSelector((state)=>state.statistics.adminStatistic)
  const topOrder = useSelector((state)=>state.statistics.adminTopOrder)
  
  
  const orderStats = [
    {
      label: "Total Pesanan Hari Ini",
      value: dataCard["totalOrder"]?.dailyOrder,
      change: dataCard["totalOrder"]?.percentage + " %" ,
      trend: dataCard["totalOrder"]?.dailyOrder < dataCard["totalOrder"]?.yesterdayOrder ? "down" : "up"
    },
    {
      label: "Pendapatan Hari Ini",
      value: "Rp." + dataCard["commission"]?.dailyCommission.toLocaleString(),
      change:dataCard["commission"]?.percentage + " %",
      trend: dataCard["commission"]?.dailyCommission < dataCard["commission"]?.yesterdayCommission ? "down" : "up",
    },
    { label: "Withdraw",
      value: "Rp." + dataCard["withdraw"]?.dailyWithdraw.toLocaleString(),
      change: dataCard["withdraw"]?.percentage + " %",
      trend: dataCard["withdraw"]?.dailyWithdraw < dataCard["withdraw"]?.yesterdayWithdraw ? "down" : "upc",
    },
  ];


  useEffect(()=>{
    dispatch(fetchAdminCard())
    dispatch(fetchAdminTopOrder())
  }, [dispatch])

  return (
    <div className="container-admin">
      {/* Sidebar */}
      <SideNavbar/>

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
                        {topOrder.map((product, index) => (
                          <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.totalQuantityOrder} Item</td>
                            <td>Rp.{parseInt(product.price * product.totalQuantityOrder).toLocaleString()}</td>
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
