import React, { useState, useEffect } from "react";
import "./PesananSaya.css";
import instance from "../../api/axiosInstance";
import { Link } from "react-router-dom";

const PesananSaya = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await instance({
        method: "get",
        url: "/orders", // Pastikan endpoint ini sesuai
        headers: {
          Authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  console.log(orders, ".........");
  

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1 className="orders-title">Pesanan Saya</h1>
      {orders?.length === 0 ? (
        <p className="no-orders">Belum ada pesanan.</p>
      ) : (
        orders?.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <p className="order-id">No Pesanan: {order.id}</p>
              <p className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </p>
            </div>
            {/* <div className="order-products">
              {order?.products?.map((product) => (
                <div className="product-item" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-quantity">
                      Jumlah: {product.quantity}
                    </p>
                    <p className="product-price">
                      Rp {Number(product.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}
            <div className="order-footer">
              <p className="order-total">
                Total: Rp {Number(order.totalPrice).toLocaleString()}
              </p>
              <div className="order-actions">
                <Link to={`/orders/${order.id}`} className="order-button">
                  Lihat Detail
                </Link>
                {order.status === "Selesai" && (
                  <button className="order-button">Konfirmasi Terima</button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PesananSaya;
