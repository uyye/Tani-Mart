// ReactJS Code
import React, { useState } from "react";
import "./KelolaPengguna.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, nama: "Haliq", peran: "Petani", NomorHp: "09887776665" },
    { id: 2, nama: "Wafiq Azizah", peran: "Pembeli", NomorHp: "09887776665" },
  ]);

  const handleUpdateUser = (id) => {
    console.log(`Update user with ID: ${id}`);
    // Add update logic here
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    console.log(`Delete user with ID: ${id}`);
  };

  return (
    <div className="manage-users">
      <h1>Kelola Pengguna</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>No.Hp</th>
            <th>Peran</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nama}</td>
              <td>{user.NomorHp}</td>
              <td>{user.peran}</td>
              <td>
                <button onClick={() => handleUpdateUser(user.id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteUser(user.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
