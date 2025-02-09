import Swal from "sweetalert2";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import instance from "../../api/axiosInstance";

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    address: "",
    phoneNumber: "",
    role: "seller",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await instance({
        method: "post",
        url: "/users/register",
        data: userData,
      });

      Swal.fire({
        title: "Success",
        text: "You are register",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userData);

  return (
    <div className="register-container-cms">
      <div className="card">
        <h2>Daftar SIAFARM</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Nama </label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              placeholder="Masukkan Username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Masukkan Password"
              required
            />
          </div>
          <div className="form-group">
            <label>Alamat </label>
            <input
              type="text"
              name="address"
              onChange={handleInputChange}
              placeholder="Masukkan Alamat"
              required
            />
          </div>
          <div className="form-group">
            <label>Nomor Telepon </label>
            <input
              type="phone"
              name="phoneNumber"
              onChange={handleInputChange}
              placeholder="Masukkan Nomor Telepon"
              required
            />
          </div>
          <button type="submit" className="register-button1">
            Daftar Penjual
          </button>
        </form>
        <p className="login-link">
          Sudah punya akun?{" "}
          <button onClick={() => navigate("/")} className="login-button-link">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
