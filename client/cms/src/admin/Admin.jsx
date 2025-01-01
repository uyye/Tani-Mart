// ReactJS Code
import React, { useState } from "react";
import "./Admin.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    /* Example data */
  ]);
  const [products, setProducts] = useState([
    /* Example data */
  ]);
  const [transactions, setTransactions] = useState([
    /* Example data */
  ]);

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>SIAFARM Admin Dashboard</h1>
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
          <h2>Kelola Pengguna</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.role}
                <button onClick={() => handleUpdateUser(user.id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="management">
          <h2>Kelola Produk</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price}
                <button onClick={() => handleUpdateProduct(product.id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="management">
          <h2>Kelola Tranksaksi</h2>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                Order #{transaction.id} - ${transaction.amount}
                <button onClick={() => handleUpdateTransaction(transaction.id)}>
                  Update
                </button>
              </li>
            ))}
          </ul>
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
