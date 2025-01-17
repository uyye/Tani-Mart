import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import instance from "../../api/axiosInstance";
import Swal from "sweetalert2";

function Login() {
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance({
        method: "post",
        url: "/users/login",
        data: loginData,
      });
      
      localStorage.setItem("access_token", data.token);
      
      if(data?.user.role === "admin"){
        navigate("/admin/dashboard")
        await Swal.fire({
          title: data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      }else if(data.user.role ==="seller"){
        navigate("/")
        await Swal.fire({
          title: data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Username or Password!",
      });
      console.log(error);
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
        <div className="button-group">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
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
