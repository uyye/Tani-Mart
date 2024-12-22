import React from "react";
import "./Admin.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <h1>SIAFARM Admin Dashboard</h1>
        <button className="logout-button">Logout</button>
      </header>
      <nav className="admin-sidebar">
        <ul>
          <li>Dashboard</li>
          <li>Kelola Pengguna</li>
          <li>Kelola Produk</li>
          <li>Transaksi</li>
          <li>Laporan</li>
        </ul>
      </nav>
      <main className="admin-main-content">
        <h2>Selamat Datang, Admin!</h2>
        <div className="admin-widgets">
          <div className="widget">
            <h3>Total Pengguna</h3>
            <p>120</p>
          </div>
          <div className="widget">
            <h3>Total Produk</h3>
            <p>50</p>
          </div>
          <div className="widget">
            <h3>Total Transaksi</h3>
            <p>200</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
