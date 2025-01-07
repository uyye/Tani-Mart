// ReactJS Code
import React from "react";
import "./dataDetail.css";

const TransactionDetail = ({ transaction }) => {
  return (
    <div className="data-detail">
      <h1>Detail Tranksaksi</h1>
      <div className="detail-container">
        <div className="detail-item">
          <label>ID Tranksaksi:</label>
          <p>{transaction.id}</p>
        </div>
        <div className="detail-item">
          <label>Nama:</label>
          <p>{transaction.userName}</p>
        </div>
        <div className="detail-item">
          <label>Produk:</label>
          <ul>
            {transaction.products.map((product, index) => (
              <li key={index}>
                {product.name} - Quantity: {product.quantity} - Price: $
                {product.price}
              </li>
            ))}
          </ul>
        </div>
        <div className="detail-item">
          <label>Jumlah Total:</label>
          <p>Rp{transaction.totalAmount}</p>
        </div>
        <div className="detail-item">
          <label>Tanggal :</label>
          <p>{transaction.date}</p>
        </div>
      </div>
    </div>
  );
};

// Example usage
const exampleTransaction = {
  id: "T12345",
  userName: "John Doe",
  email: "john@example.com",
  products: [
    { name: "Carrots", quantity: 3, price: 5.0 },
    { name: "Potatoes", quantity: 2, price: 3.0 },
  ],
  totalAmount: 21.0,
  date: "2025-01-01",
};

export default function App() {
  return <TransactionDetail transaction={exampleTransaction} />;
}
