// ReactJS Code
import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataUser } from "../features/users/userSlice";
import { fetchDataProduct } from "../features/products/productSlice";
import { fetchAdminOrder } from "../features/orders/orderSlice";
import {Link} from "react-router-dom"
import AdminCart from "../components/adminCart/AdminCart";
import { CiUser } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { LiaDollyFlatbedSolid } from "react-icons/lia";

const AdminDashboard = () => {

  const dispatch = useDispatch()

  const data = ["Pengguna", "Produk", "Transaction"]

  const users = useSelector((state)=>state.users.users)
  const products = useSelector((state)=>state.products.products)
  const transactions = useSelector((state)=>state.orders.orders)

  useEffect(()=>{
    dispatch(fetchDataUser())
    dispatch(fetchDataProduct())
    dispatch(fetchAdminOrder())
  },[])

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1> Admin Dashboard</h1>
      </header>

      <section className="card-box">
            <AdminCart icon={<CiUser/>} length={users.length} goTo={"/KelolaPengguna"}>Pengguna</AdminCart>
            <AdminCart icon={<AiOutlineProduct/>} length={products.length} goTo={"/KelolaProduk"}>Produk</AdminCart>
            <AdminCart icon={<LiaDollyFlatbedSolid/>} length={transactions.length} goTo={"/KelolaTranksaksi"}>Transaksi</AdminCart>
      </section>

      {/* <section className="stats-overview">
        <div className="stat-card">
          <h2>Total Pengguna</h2>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h2>Total Produk</h2>
          <p>{products.length}</p>
        </div>
        <div className="stat-card">
          <h2>Total Tranksaksi</h2>
          <p>{transactions.length}</p>
        </div>
      </section>

      <section className="management-sections">
        <div className="management">
          <Link to={"/KelolaPengguna"}><h2>Kelola Pengguna</h2></Link>
        </div>

        <div className="management">
          <Link to={"/KelolaProduk"}><h2>Kelola Produk</h2></Link>
          
        </div>

        <div className="management">
          <Link to={"/KelolaTranksaksi"}><h2>Kelola Tranksaksi</h2></Link>
        </div>
      </section> */}
    </div>
  );
};

export default AdminDashboard;
