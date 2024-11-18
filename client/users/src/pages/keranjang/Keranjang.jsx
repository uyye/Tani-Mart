import React, { useState } from "react";
import "./keranjang.css";

export default function Keranjang() {
  // Data produk dalam keranjang
  const [items, setItems] = useState([
    { id: 1, name: "Produk A", quantity: 1, price: 10000 },
    { id: 2, name: "Produk B", quantity: 2, price: 20000 },
    { id: 3, name: "Produk C", quantity: 1, price: 15000 },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  // Menangani perubahan checkbox
  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  // Menghitung subtotal
  const calculateSubtotal = (quantity, price) => quantity * price;

  // Menghitung total pembayaran
  const calculateTotal = () =>
    items
      .filter((item) => selectedItems.includes(item.id))
      .reduce(
        (acc, item) => acc + calculateSubtotal(item.quantity, item.price),
        0
      );

  // Menghapus item dari keranjang
  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSelectedItems((prevSelected) =>
      prevSelected.filter((itemId) => itemId !== id)
    );
  };

  return (
    <div className="cart">
      <h1>Keranjang Belanja</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Produk</th>
            <th>Quantity</th>
            <th>Harga Satuan</th>
            <th>Subtotal</th>
            <th>Pilih</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>Rp {item.price.toLocaleString()}</td>
              <td>
                Rp{" "}
                {calculateSubtotal(item.quantity, item.price).toLocaleString()}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
              <td>
                <button className="btn-order">Pesan</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-footer">
        <button
          className="btn-submit"
          onClick={() =>
            alert(`Total Pembayaran: Rp ${calculateTotal().toLocaleString()}`)
          }
        >
          Checkout Total: Rp {calculateTotal().toLocaleString()}
        </button>
      </div>
    </div>
  );
}

