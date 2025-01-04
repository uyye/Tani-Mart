// ReactJS Code
import React from "react";
import "./DetailPengguna.css";

const UserDetail = ({ user }) => {
  return (
    <div className="user-detail">
      <h1>Detail Pengguna</h1>
      <div className="detail-container">
        <div className="detail-item">
          <label>ID:</label>
          <p>{user.id}</p>
        </div>
        <div className="detail-item">
          <label>Nama:</label>
          <p>{user.name}</p>
        </div>
        <div className="detail-item">
          <label>Peranan:</label>
          <p>{user.role}</p>
        </div>
        <div className="detail-item">
          <label>No Hp:</label>
          <p>{user.phone}</p>
        </div>
        <div className="detail-item">
          <label>Alamat:</label>
          <p>{user.address}</p>
        </div>
      </div>
    </div>
  );
};

// Example usage
const exampleUser = {
  id: 1,
  name: "John Doe",
  role: "Petani",
  phone: "123-456-7890",
  address: "Jalan Karakasia, Bantaeng",
};

export default function App() {
  return <UserDetail user={exampleUser} />;
}
