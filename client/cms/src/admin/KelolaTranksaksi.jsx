// ReactJS Code
import React, { useState } from "react";
import "./KelolaTranksaksi.css";

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      pembeli: "John Doe",
      total: 50000,
      status: "Pending",
      date: "2024-01-01",
    },
    {
      id: 2,
      pembeli: "Jane Smith",
      total: 80000,
      status: "Completed",
      date: "2024-01-02",
    },
  ]);

  const handleUpdateTransaction = (id) => {
    console.log(`Update transaction with ID: ${id}`);
    // Add update logic here
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
    console.log(`Delete transaction with ID: ${id}`);
  };

  return (
    <div className="manage-transactions">
      <h1>Kelola Tranksaksi</h1>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pembeli</th>
            <th>Total</th>
            <th>Status</th>
            <th>Tanggal Order</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.pembeli}</td>
              <td>Rp{transaction.total.toLocaleString()}</td>
              <td>{transaction.status}</td>
              <td>{transaction.date}</td>
              <td>
                <button onClick={() => handleUpdateTransaction(transaction.id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteTransaction(transaction.id)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTransactions;
