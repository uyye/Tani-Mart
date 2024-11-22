import React, { useState } from "react";
import "./Order.css";

const OrderTable = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "bennyy",
      address: "Jl. Merdeka No. 1",
      phone: "08123456789",
      items: [
        { productName: "Tomat", quantity: 2, price: 10000 },
        { productName: "Cabai", quantity: 1, price: 15000 },
      ],
    },
    {
      id: 2,
      name: "kevin",
      address: "Jl. Sudirman No. 45",
      phone: "08198765432",
      items: [
        { productName: "Kentang", quantity: 3, price: 5000 },
        { productName: "Bawang", quantity: 1, price: 20000 },
      ],
    },
  ]);

  // Menghapus order
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus order ini?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  // Mengupdate order
  const handleUpdate = (id) => {
    const newName = prompt("Masukkan nama pembeli baru:");
    const newAddress = prompt("Masukkan alamat baru:");
    const newPhone = prompt("Masukkan nomor telepon baru:");

    if (newName && newAddress && newPhone) {
      setOrders(
        orders.map((order) =>
          order.id === id
            ? { ...order, name: newName, address: newAddress, phone: newPhone }
            : order
        )
      );
    }
  };

  return (
    <div className="table-container">
      <h1>Cek Order</h1>

      {/* Tabel */}
      <table className="order-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pembeli</th>
            <th>Alamat</th>
            <th>No Telepon</th>
            <th>Orderan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>
                  <ul className="order-items">
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.productName} x {item.quantity} = Rp{" "}
                        {(item.quantity * item.price).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button
                    className="btn-update"
                    onClick={() => handleUpdate(order.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(order.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                Tidak ada orderan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
