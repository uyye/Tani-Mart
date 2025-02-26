import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminApproval.css";
import {useSelector, useDispatch} from "react-redux"

import SideNavbar from "../components/sideNavbar/SideNavbar";
import { useEffect } from "react";
import { fetchAdminRequestData, fetchAprroveProduct } from "../features/products/productSlice";
const AdminApproval = () => {
  const requestData = useSelector((state)=>state.products.requestData)
  console.log(requestData);
  
  const dispatch = useDispatch()

  const navigate = useNavigate();

  // Fungsi untuk menangani persetujuan produk
  const handleApprove = (id) => {
    dispatch(fetchAprroveProduct(id))
    navigate("/admin/KelolaProduk")
  };

  // Fungsi untuk menangani penolakan produk
  const handleReject = (id) => {
    alert(`Produk #${id} telah ditolak.`);
    // Tambahkan logika untuk update status produk, misalnya melalui API
  };

  useEffect(()=>{
    dispatch(fetchAdminRequestData())
  }, [dispatch])
 
  return (
    <div className="admin-approval-page">
      {/* Sidebar */}
      <SideNavbar/>
      <div className="approval-container">
        <h2>Admin Approval</h2>
        <div className="approval-list">
          {requestData?.map((item) => (
            <div key={item.id} className="approval-item">
              <div className="approval-header">
                <h3>#{item.name}</h3>
                <span className="pending-status">Menunggu Persetujuan</span>
              </div>
              <p>Petani mengajukan produk baru untuk dijual di platform.</p>
              <div className="approval-actions">
                <button
                  className="approve-button"
                  onClick={() => handleApprove(item.id)}
                >
                  Setujui
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleReject(item.id)}
                >
                  Tolak
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/admin/KelolaProduk")} className="close-button">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default AdminApproval;
