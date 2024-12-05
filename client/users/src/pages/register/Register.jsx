// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Tambahkan logika pendaftaran di sini
    console.log("User terdaftar:", username, password, alamat, telepon);
    navigate("/"); // Redirect ke halaman login setelah pendaftaran
  };

  return (
    <div className="register-container" autoComplete="off">
      <h2>Daftar SIAFARM</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Nama </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan Username"
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan Password"
            required
          />
        </div>
        <div className="form-group">
          <label>Alamat </label>
          <input
            type="text"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            placeholder="Masukkan Alamat"
            required
          />
        </div>
        <div className="form-group">
          <label>Nomor Telepon </label>
          <input
            type="phone"
            value={telepon}
            onChange={(e) => setTelepon(e.target.value)}
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
        <button
          onClick={() => navigate("/login")}
          className="login-button-link"
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
