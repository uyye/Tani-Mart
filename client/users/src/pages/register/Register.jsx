// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import instance from "../../api/axiosInstance";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();
  const [dataRegister, setDataRegister] = useState({
    name:"",
    password:"",
    address:"",
    phoneNumber:"",
    role:"users"
  })

  const handleInputChange = (e)=>{
    const {name, value} = e.target
    setDataRegister({
      ...dataRegister, [name]:value
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const {data} = await instance({
        method:"post",
        url:"/users/register",
        data:dataRegister
      })
      Swal.fire({
        title: "Success",
        text: data.message,
        icon:"success",
        showConfirmButton:false,
        timer:2000
      });

      navigate("/login")
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div className="register-container">
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
        <button type="submit" className="register-button">
          Daftar
        </button>
      </form>
      <p className="login-link">
        Sudah punya akun?{" "}
        <button onClick={() => navigate("/")} className="login-button-link">
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
