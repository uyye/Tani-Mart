import React, { useEffect } from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataOrder } from "../../features/orders/orderSlice";
import DetailButton from "../../components/detailButton/DetailButton";

export default function Order() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchDataOrder());
  }, [dispatch]);

  return (
    <div className="order-page">
      <h1 className="order-title">Pesanan Masuk</h1>
      <section className="order-list">
        {data?.length > 0 ? (
          <table className="order-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Pembeli</th>
                <th>Order ID</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => (
                <tr key={order.id}>
                  <td data-label="No">{index + 1}</td>
                  <td data-label="Nama Pembeli">{order.User.name}</td>
                  <td data-label="Order ID">{order.id}</td>
                  <td
                    data-label="Status"
                    className={
                      order.status === "paid"
                        ? "status completed"
                        : "status pending"
                    }
                  >
                    {order.status === "paid" ? "Lunas" : "Pending"}
                  </td>
                  <td data-label="Aksi">
                    <Link to={`/order/${order.id}`}>
                      <DetailButton />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">Tidak ada pesanan</p>
        )}
      </section>
    </div>
  );
}
