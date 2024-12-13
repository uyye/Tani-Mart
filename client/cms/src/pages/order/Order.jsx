import React, { useState } from "react";
import "./Order.css";

const initialOrders = [
  {
    id: 1,
    buyerName: "Andi",
    productName: "Tomat Organik",
    type: "Tersedia",
    quantity: 3,
    total: 30000,
    status: "Selesai",
  },
  {
    id: 2,
    buyerName: "Budi",
    productName: "Kentang Presale",
    type: "presale",
    quantity: 5,
    total: 40000,
    status: "Menunggu",
  },
  {
    id: 3,
    buyerName: "Citra",
    productName: "Bayam Organik",
    type: "Tersedia",
    quantity: 10,
    total: 50000,
    status: "Menunggu",
  },
];

function orderTable() {
  const [orders, setOrders] = useState(initialOrders);

  // Function untuk mengupdate status pesanan
  const handleUpdate = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? {
            ...order,
            status: order.status === "Menunggu" ? "Selesai" : "Menunggu",
          }
        : order
    );
    setOrders(updatedOrders);
  };

  // Function untuk menghapus pesanan
  const handleDelete = (id) => {
    const filteredOrders = orders.filter((order) => order.id !== id);
    setOrders(filteredOrders);
  };

  return (
    <div className="app">
      <h1>Pesanan Masuk</h1>
      <section className="order-list">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Pembeli</th>
              <th>Nama Produk</th>
              <th>Tipe</th>
              <th>Jumlah</th>
              <th>Total</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.buyerName}</td>
                <td>{order.productName}</td>
                <td
                  className={order.type === "Presale" ? "presale" : "available"}
                >
                  {order.type}
                </td>
                <td>{order.quantity}</td>
                <td>
                  {order.total.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td
                  className={
                    order.status === "Selesai" ? "completed" : "pending"
                  }
                >
                  {order.status}
                </td>
                <td>
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(order.id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(order.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default orderTable;
