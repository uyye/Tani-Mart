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
    <div className="app">
      <h1>Pesanan Masuk</h1>
      <section className="order-list">
        {data?.length > 0 ? (
          <table>
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
                  <td>{index + 1}</td>
                  <td>{order.User.name}</td>
                  <td>{order.id}</td>
                  <td
                    className={
                      order.status === "paid" ? "completed" : "pending"
                    }
                  >
                    {order.status === "paid" ? "Lunas" : "Pending"}
                  </td>
                  <td>
                    <Link to={`/order/${order.id}`}>
                      <DetailButton />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">Tidak ada produk</p>
        )}
      </section>
    </div>
  );
}
