import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminApproval.css";

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

  return (
    <div className="admin-approval-page">
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
