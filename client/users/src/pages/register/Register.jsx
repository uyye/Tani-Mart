import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import instance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "animate.css";

function Register() {
  const navigate = useNavigate();
  const [dataRegister, setDataRegister] = useState({
    name: "",
    password: "",
    address: "",
    phoneNumber: "",
    role: "users",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataRegister({
      ...dataRegister,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance({
        method: "post",
        url: "/users/register",
        data: dataRegister,
      });
      Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="register-container">
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

      {/* Card Register */}
      <div className="register-card animate__animated animate__zoomIn">
        <h2>Daftar Akun</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              placeholder="Masukkan Nama"
              required
              autoFocus
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
            <label>Alamat</label>
            <input
              type="text"
              name="address"
              onChange={handleInputChange}
              placeholder="Masukkan Alamat"
              required
            />
          </div>
          <div className="form-group">
            <label>Nomor Telepon</label>
            <input
              type="tel"
              name="phoneNumber"
              onChange={handleInputChange}
              placeholder="Masukkan Nomor Telepon"
              required
            />
          </div>
          <button
            type="submit"
            className="register-button animate__animated animate__pulse"
          >
            Daftar
          </button>
        </form>
        <p className="login-link">
          Sudah punya akun?{" "}
          <button
            onClick={() => navigate("/login")}
            className="login-button-link animate__animated animate__fadeInUp"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
