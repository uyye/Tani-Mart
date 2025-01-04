// ReactJS Code
import React, { useEffect, useState } from "react";
import "./KelolaPengguna.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataUser } from "../features/users/userSlice";
import DetailButton from "../components/detailButton/DetailButton";
import UpdateButton from "../components/updateButton/UpdateButton";
import DeleteButton from "../components/deleteButton/DeleteButton";

const ManageUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector((state)=>state.users.users)
  console.log(users);
  
  
  
  // const [users, setUsers] = useState([
  //   { id: 1, nama: "Haliq", peran: "Petani", NomorHp: "09887776665" },
  //   { id: 2, nama: "Wafiq Azizah", peran: "Pembeli", NomorHp: "09887776665" },
  // ]);

  const handleUpdateUser = (id) => {
    console.log(`Update user with ID: ${id}`);
    // Add update logic here
  };

  // const handleDeleteUser = (id) => {
  //   setUsers(users.filter((user) => user.id !== id));
  //   console.log(`Delete user with ID: ${id}`);
  // };
  
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
                <DetailButton/>
                <UpdateButton/>
                <DeleteButton/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
