// ReactJS Code
import React, { useEffect } from "react";
import "./dataDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail } from "../features/orders/orderSlice";
import { useParams } from "react-router-dom";

const TransactionDetail = ({ transaction }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orders.orderDetail);

  console.log(data, "INI DATA DETAIL PADA ELEMENT");

  useEffect(() => {
    dispatch(fetchOrderDetail(id));
  }, []);

  return (
    <div className="data-detail">
      <h1>Detail Tranksaksi</h1>
      <div className="detail-container">
        <div className="detail-item">
          <label>ID Tranksaksi:</label>
          <p>{data.id}</p>
        </div>
        <div className="detail-item">
          <label>Nama:</label>
          <p>{data.User.name}</p>
        </div>
        <div className="detail-item">
          <label>Produk:</label>
          <ul>
            {data.OrderDetails?.map((item, index) => (
              <li key={index}>
                {item.Product?.name} - Jumlah: {item.quantity} - Harga Satuan:
                Rp
                {item.Product?.price.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="detail-item">
          <label>Jumlah Total:</label>
          <p>Rp {data.totalPrice.toLocaleString()}</p>
        </div>
        <div className="detail-item">
          <label>Tanggal :</label>
          <p>{data.createdAt.split("T")[0]}</p>
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
