import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axiosInstance";
import "animate.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./login.css";
// import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState({
    name: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataLogin({
      ...dataLogin,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance({
        method: "post",
        url: "../../../../cms/src/pages/home/Home.jsx",
        data: dataLogin,
      });

      localStorage.setItem("access_token", data.token);
      const token = localStorage.getItem("access_token");
      const decode = jwtDecode(token);
      if (decode.role === "admin") {
        navigate("/admin/dashboard");
      } else if (decode.role === "seller") {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="login-container">
      {/* Background Partikel */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#6a11cb",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Card Login */}
      <div className="login-card animate__animated animate__zoomIn">
        <h2>SIAFARM</h2>
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
            className="register-button-link animate__animated animate__fadeInUp"
          >
            Daftar
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
