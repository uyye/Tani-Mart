// ReactJS Code
import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataUser } from "../features/users/userSlice";
import { fetchDataProduct } from "../features/products/productSlice";
import { fetchAdminOrder } from "../features/orders/orderSlice";
import {Link} from "react-router-dom"

const AdminDashboard = () => {

  const dispatch = useDispatch()
  const users = useSelector((state)=>state.users.users)
  const products = useSelector((state)=>state.products.products)
  const transactions = useSelector((state)=>state.orders.orders)

  // const [transactions, setTransactions] = useState([
  //   /* Example data */
  // ]);

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

      <section className="stats-overview">
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
      </section>
    </div>
  );

  function handleUpdateUser(id) {
    console.log(`Update user ${id}`);
    // Add logic here
  }

  function handleDeleteUser(id) {
    console.log(`Delete user ${id}`);
    // Add logic here
  }

  function handleUpdateProduct(id) {
    console.log(`Update product ${id}`);
    // Add logic here
  }

  function handleDeleteProduct(id) {
    console.log(`Delete product ${id}`);
    // Add logic here
  }

  function handleUpdateTransaction(id) {
    console.log(`Update transaction ${id}`);
    // Add logic here
  }
};

export default AdminDashboard;
