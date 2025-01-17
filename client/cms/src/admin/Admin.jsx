// ReactJS Code
import React, { useEffect } from "react";
import "./Admin.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataUser } from "../features/users/userSlice";
import { fetchDataProduct } from "../features/products/productSlice";
import { fetchAdminOrder } from "../features/orders/orderSlice";
import AdminCart from "../components/adminCart/AdminCart";
import { CiUser } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { LiaDollyFlatbedSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users.users);
  const products = useSelector((state) => state.products.products);
  const transactions = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchDataUser());
    dispatch(fetchDataProduct());
    dispatch(fetchAdminOrder());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Menghapus token autentikasi
    navigate("/login"); // Mengarahkan ke halaman login
  };

  return (
    <div className="admin-dashboard">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>

      <section className="card-box">
        <AdminCart
          icon={<CiUser />}
          length={users.length}
          goTo={"/admin/KelolaPengguna"}
        >
          Pengguna
        </AdminCart>
        <AdminCart
          icon={<AiOutlineProduct />}
          length={products.length}
          goTo={"/admin/KelolaProduk"}
        >
          Produk
        </AdminCart>
        <AdminCart
          icon={<LiaDollyFlatbedSolid />}
          length={transactions.length}
          goTo={"/admin/KelolaTranksaksi"}
        >
          Transaksi
        </AdminCart>
      </section>
    </div>
  );
};

export default AdminDashboard;
