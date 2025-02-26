import { useState } from "react";
import { Link } from "react-router-dom";
import "./KelolaPengguna.css";
import { FiSidebar } from "react-icons/fi";
import logo from "../assets/logo.png";
import {useSelector, useDispatch} from "react-redux"

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Timer,
  Users,
  Wallet,
  LogOut,
  CheckSquare, // ikon untuk approval
} from "lucide-react";
import { useEffect } from "react";
import { fetchDataUser } from "../features/users/userSlice";
import SideNavbar from "../components/sideNavbar/SideNavbar";

const usersData = [
  {
    id: "U001",
    name: "Budi Santoso",
    phone: "081234567890",
    role: "Admin",
  },
  {
    id: "U002",
    name: "Siti Rahmawati",
    phone: "082345678901",
    role: "Penjual",
  },
  {
    id: "U003",
    name: "Agus Wijaya",
    phone: "083456789012",
    role: "Pembeli",
  },
];

export default function KelolaPengguna() {
  const dispatch = useDispatch()
  const users = useSelector((state)=>state.users.users)
  console.log(users);
 
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    alert("Pengguna berhasil dihapus!");
  };


  useEffect(()=>{
    dispatch(fetchDataUser())
  },[dispatch])

  return (
    <div className="container">
      {/* Sidebar */}
      <SideNavbar/>

      {/* Konten Kelola Pengguna */}
      <div className="kelola-pengguna-container">
        <h2>Kelola Pengguna</h2>

        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>No HP</th>
              <th>Peran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/admin/DetailPengguna/${user.id}`,
                      }}
                      state={{ user }} // Mengirim data pengguna ke halaman detail
                      className="btn-detail"
                    >
                      Detail
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Tidak ada data pengguna.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
