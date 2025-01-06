// ReactJS Code
import React, { useEffect, useState } from "react";
import "./KelolaPengguna.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataUser } from "../features/users/userSlice";
import DetailButton from "../components/detailButton/DetailButton";
import UpdateButton from "../components/updateButton/UpdateButton";
import DeleteButton from "../components/deleteButton/DeleteButton";
import {Link} from "react-router-dom"

const ManageUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector((state)=>state.users.users)
  
  useEffect(()=>{
    dispatch(fetchDataUser())
  },[])

  return (
    <div className="manage-users">
      <h1>Kelola Pengguna</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/DetailPengguna/${user.id}`}><DetailButton/></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
