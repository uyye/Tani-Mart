import React, { useState, useEffect } from "react";
import "./PesananSaya.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../features/orders/orderSlice";

const PesananSaya = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dataOrder.orders);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  return (
    <div className="orders-container">
      <h1 className="orders-title">Pesanan Saya</h1>
      {data?.length === 0 ? (
        <p className="no-orders">Belum ada pesanan.</p>
      ) : (
        data?.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <p className="order-id">No Pesanan: {order.id}</p>
              <p className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </p>
            </div>
            <div className="order-products">
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
            </div>
            <div className="order-footer">
              <p className="order-total">
                Total: Rp {Number(order.totalPrice).toLocaleString()}
              </p>
              <div className="order-actions">
                <Link to={`/orders/${order.id}`} className="detail-button">
                  Lihat Detail
                </Link>
                {order.status === "Dikirim" && (
                  <button className="order-button confirm">
                    Lacak Pesanan
                  </button>
                )}
                {order.status === "Selesai" && (
                  <button className="order-button confirm">
                    Konfirmasi Terima
                  </button>
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
