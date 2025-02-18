import React, { useState } from "react";
import "./WithdrawPage.css";

const WithdrawPage = () => {
  const [amount, setAmount] = useState("");
  const [withdrawHistory, setWithdrawHistory] = useState([]);

  const handleWithdraw = () => {
    if (amount) {
      setWithdrawHistory([
        ...withdrawHistory,
        { amount, date: new Date().toLocaleString() },
      ]);
      setAmount("");
    }
  };

  return (
    <div className="withdraw-page">
      <h1>Kelola Withdraw</h1>
      <div className="withdraw-form">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Masukkan jumlah withdraw"
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      <div className="withdraw-history">
        <h2>Riwayat Withdraw</h2>
        <ul>
          {withdrawHistory.map((withdraw, index) => (
            <li key={index}>
              <span>Jumlah: {withdraw.amount}</span>
              <span>Tanggal: {withdraw.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WithdrawPage;
