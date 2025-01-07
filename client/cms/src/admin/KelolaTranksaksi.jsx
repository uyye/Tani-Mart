// ReactJS Code
import React, { useEffect, useState } from "react";
import "./dataManage.css";
import {useDispatch, useSelector} from "react-redux"
import { fetchAdminOrder } from "../features/orders/orderSlice";
import DetailButton from "../components/detailButton/DetailButton";
import {Link} from "react-router-dom"

const ManageTransactions = () => {

  const dispatch = useDispatch()
  const transactions = useSelector((state)=>state.orders.orders)
  
  // console.log(data);
  
  // const [transactions, setTransactions] = useState([
  //   {
  //     id: 1,
  //     pembeli: "John Doe",
  //     total: 50000,
  //     status: "Pending",
  //     date: "2024-01-01",
  //   },
  //   {
  //     id: 2,
  //     pembeli: "Jane Smith",
  //     total: 80000,
  //     status: "Completed",
  //     date: "2024-01-02",
  //   },
  // ]);

  useEffect(()=>{
    dispatch(fetchAdminOrder())
  }, [])

  return (
    <div className="manage-table">
      <h1>Kelola Tranksaksi</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Pembeli</th>
            <th>Total</th>
            <th>Status</th>
            <th>Tanggal Order</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.User.name}</td>
              <td>Rp{transaction.totalPrice.toLocaleString()}</td>
              <td>{transaction.status}</td>
              <td>{transaction.createdAt.split("T")[0]}</td>
              <td>
                <Link to={"/admin/DetailTranksaksi"}><DetailButton/></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTransactions;
