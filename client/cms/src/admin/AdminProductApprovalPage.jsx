import React, { useState } from "react";
import "./AdminProductApprovalPage.css";

const AdminProductApprovalPage = () => {
  const [productRequests, setProductRequests] = useState([
    { id: 1, productName: "Product A", seller: "Seller A", date: "2023-10-01" },
    { id: 2, productName: "Product B", seller: "Seller B", date: "2023-10-02" },
  ]);

  const handleApprove = (id) => {
    setProductRequests(productRequests.filter((request) => request.id !== id));
  };

  const handleReject = (id) => {
    setProductRequests(productRequests.filter((request) => request.id !== id));
  };

  return (
    <div className="admin-product-approval-page">
      <h1>Approve Permintaan Add Product</h1>
      <table>
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Seller</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {productRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.productName}</td>
              <td>{request.seller}</td>
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

export default AdminProductApprovalPage;
