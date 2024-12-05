import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import instance from "../../api/axiosInstance";

function Login() {
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState({
    name:"",
    password:""
  })

  const handleInputChange = (e)=>{
    const {name, value} = e.target
    setDataLogin({
      ...dataLogin, [name]:value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const {data} = await instance({
        method:"post",
        url:"/users/login",
        data:dataLogin
      })
      console.log(data);
      localStorage.setItem("access_token", data.token)
      navigate("/")
    } catch (error) {
      console.log(error);
      
    }
  };

  console.log(dataLogin);
  
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
