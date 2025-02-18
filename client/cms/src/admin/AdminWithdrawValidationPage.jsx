import React, { useState } from "react";
import "./AdminWithdrawValidationPage.css";

const AdminWithdrawValidationPage = () => {
  const [withdrawRequests, setWithdrawRequests] = useState([
    { id: 1, seller: "Seller A", amount: 100, date: "2023-10-01" },
    { id: 2, seller: "Seller B", amount: 200, date: "2023-10-02" },
  ]);

  const handleApprove = (id) => {
    setWithdrawRequests(
      withdrawRequests.filter((request) => request.id !== id)
    );
  };

  const handleReject = (id) => {
    setWithdrawRequests(
      withdrawRequests.filter((request) => request.id !== id)
    );
  };

  return (
    <div className="admin-withdraw-validation-page">
      <h1>Validasi Permintaan Withdraw</h1>
      <table>
        <thead>
          <tr>
            <th>Seller</th>
            <th>Jumlah</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {withdrawRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.seller}</td>
              <td>{request.amount}</td>
              <td>{request.date}</td>
              <td>
                <div className="buttonwithdraw">
                  <button onClick={() => handleApprove(request.id)}>
                    Approve
                  </button>

                  <button onClick={() => handleReject(request.id)}>
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminWithdrawValidationPage;
