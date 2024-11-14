import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "user" && password === "password") {
      navigate("/home");
    } else {
      alert("Username atau password salah");
    }
  };
  return (
    <div className="login-container">
      <h2>Login SIAFARM</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan Username"
            required
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
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="register-link">
        Belum punya akun?{" "}
        <button
          onClick={() => navigate("/register")}
          className="register-button-link"
        >
          Daftar
        </button>
      </p>
    </div>
  );
}

export default Login;
