import React, { useEffect, useState } from "react";
import instance from "../../api/axiosInstance";
import "./AdminUserList.css";

function AdminUserList() {
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    // Fetch sellers and buyers data
    const fetchData = async () => {
      try {
        const sellersResponse = await instance.get("/users?role=seller");
        const buyersResponse = await instance.get("/users?role=buyer");

        setSellers(sellersResponse.data);
        setBuyers(buyersResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-user-list-container">
      <h1>Daftar Pengguna</h1>

      <section className="user-section">
        <h2>Daftar Penjual</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Nomor Telepon</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={seller.id}>
                <td>{index + 1}</td>
                <td>{seller.name}</td>
                <td>{seller.address}</td>
                <td>{seller.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="user-section">
        <h2>Daftar Pembeli</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Nomor Telepon</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, index) => (
              <tr key={buyer.id}>
                <td>{index + 1}</td>
                <td>{buyer.name}</td>
                <td>{buyer.address}</td>
                <td>{buyer.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminUserList;
