import React, { useEffect, useState } from "react";
import "./Order.css";
import instance from "../../api/axiosInstance";
import DetailButton from "../../components/detailButton/DetailButton";
import UpdateButton from "../../components/updateButton/UpdateButton";
import DeleteButton from "../../components/deleteButton/DeleteButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataOrder } from "../../features/orders/orderSlice";

export default function Order() {
  const dispatch = useDispatch()
  const data = useSelector((state)=>state.orders.orders)

   
  useEffect(()=>{
    dispatch(fetchDataOrder())
  },[dispatch])

  return (
    <div className="app">
      <h1>Pesanan Masuk</h1>
      <section className="order-list">
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
            {data?.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.User.name}</td>
                <td>{order.id}</td>
                {/* <td>
                  {order.totalPrice.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td> */}
                <td
                  className={
                    order.status === "paid" ? "completed" : "pending"
                  }
                >
                  {order.status === "paid"?"Lunas":"pending"}
                </td>
                <td>
                  <Link to={`/order/${order.id}`}><DetailButton/> </Link>
                  {/* <UpdateButton/>
                  <DeleteButton/> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}