import { useParams } from "react-router-dom";
import "./DetailPengguna.css";

const usersData = [
  {
    id: "U001",
    name: "Budi Santoso",
    phone: "081234567890",
    role: "Admin",
    address: "Jl. Merdeka No. 10, Jakarta",
    joinDate: "2022-01-15",
    totalTransactions: 120,
  },
  {
    id: "U002",
    name: "Siti Rahmawati",
    phone: "082345678901",
    role: "Penjual",
    address: "Jl. Raya Bogor No. 25, Bogor",
    joinDate: "2023-03-22",
    totalTransactions: 85,
  },
  {
    id: "U003",
    name: "Agus Wijaya",
    phone: "083456789012",
    role: "Pembeli",
    address: "Jl. Ahmad Yani No. 50, Bandung",
    joinDate: "2021-07-10",
    totalTransactions: 30,
  },
];

export default function DetailPengguna() {
  const { id } = useParams();
  const user = usersData.find((user) => user.id === id);

  return (
    <div className="detail-pengguna-container">
      <h2>Detail Pengguna</h2>
      <div className="detail-card">
        <div className="detail-row">
          <span className="label">ID Pengguna:</span>
          <span className="value">{user.id}</span>
        </div>
        <div className="detail-row">
          <span className="label">Nama:</span>
          <span className="value">{user.name}</span>
        </div>
        <div className="detail-row">
          <span className="label">No HP:</span>
          <span className="value">{user.phone}</span>
        </div>
        <div className="detail-row">
          <span className="label">Peran:</span>
          <span className={`value role-${user.role.toLowerCase()}`}>
            {user.role}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Alamat:</span>
          <span className="value">{user.address}</span>
        </div>
        <div className="detail-row">
          <span className="label">Tanggal Bergabung:</span>
          <span className="value">{user.joinDate}</span>
        </div>
        <div className="detail-row">
          <span className="label">Total Transaksi:</span>
          <span className="value">{user.totalTransactions} kali</span>
        </div>
      </div>
    </div>
  );
}
