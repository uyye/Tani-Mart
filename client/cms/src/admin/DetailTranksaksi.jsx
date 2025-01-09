// ReactJS Code
import React, { useEffect } from "react";
import "./dataDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail } from "../features/orders/orderSlice";
import { useParams } from "react-router-dom";

export default function TransactionDetail(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orders.orderDetail);

  console.log(data, "INI DATA DETAIL PADA ELEMENT");

  useEffect(() => {
    dispatch(fetchOrderDetail(id));
  }, [id]);

  return (
    <div className="data-detail">
      <h1>Detail Transaksi</h1>
      {data ? (
        <div className="detail-container">
          <div className="detail-item">
            <label>ID Transaksi:</label>
            <p>{data.id}</p>
          </div>
          <div className="detail-item">
            <label>Nama:</label>
            <p>{data.User?.name || "Nama tidak tersedia"}</p>
          </div>
          <div className="detail-item">
            <label>Produk:</label>
            <ul>
              {data.OrderDetails?.map((item, index) => (
                <li key={index}>
                  {item.Product?.name || "Produk tidak tersedia"} - Jumlah:{" "}
                  {item.quantity || 0} - Harga Satuan: Rp{" "}
                  {item.Product?.price?.toLocaleString() || "0"}
                </li>
              ))}
            </ul>
          </div>
          <div className="detail-item">
            <label>Jumlah Total:</label>
            <p>Rp {data.totalPrice?.toLocaleString() || "0"}</p>
          </div>
          <div className="detail-item">
            <label>Tanggal:</label>
            <p>{data.createdAt?.split("T")[0] || "Tanggal tidak tersedia"}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
};


