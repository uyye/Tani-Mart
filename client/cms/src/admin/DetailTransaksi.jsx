import { useParams, Link } from "react-router-dom";
import "./DetailTransaksi.css";
import { FiArrowLeft } from "react-icons/fi";

// Data dummy untuk transaksi
const transaksiData = {
  T001: {
    id: "T001",
    pembeli: "Budi Santoso",
    tanggalOrder: "2024-01-20",
    metodePembayaran: "Transfer Bank",
    status: "Selesai",
    alamatPengiriman: "Jl. Merdeka No. 10, Jakarta",
    totalHarga: 150000,
    produk: [
      {
        id: "P001",
        nama: "Tomat Segar",
        kategori: "Sayuran",
        harga: 50000,
        jumlah: 2,
        toko: "Toko Sayur Makmur",
        totalBayarToko: 100000,
        gambar: "/images/tomat.jpg",
      },
      {
        id: "P002",
        nama: "Beras Premium",
        kategori: "Beras",
        harga: 50000,
        jumlah: 1,
        toko: "Toko Beras Sejahtera",
        totalBayarToko: 50000,
        gambar: "/images/beras.jpg",
      },
    ],
  },
  T002: {
    id: "T002",
    pembeli: "Siti Rahmawati",
    tanggalOrder: "2024-01-21",
    metodePembayaran: "E-Wallet",
    status: "Diproses",
    alamatPengiriman: "Jl. Sudirman No. 5, Bandung",
    totalHarga: 250000,
    produk: [
      {
        id: "P003",
        nama: "Wortel Segar",
        kategori: "Sayuran",
        harga: 50000,
        jumlah: 3,
        toko: "Toko Sayur Makmur",
        totalBayarToko: 150000,
        gambar: "/images/wortel.jpg",
      },
      {
        id: "P004",
        nama: "Minyak Goreng",
        kategori: "Minyak",
        harga: 50000,
        jumlah: 2,
        toko: "Toko Sembako Jaya",
        totalBayarToko: 100000,
        gambar: "/images/minyak.jpg",
      },
    ],
  },
};

export default function DetailTransaksi() {
  const { id } = useParams();
  const transaksi = transaksiData[id];

  // if (!transaksi) {
  //   return <h2>Transaksi tidak ditemukan</h2>;
  // }

  return (
    <div className="detail-transaksi-container">
      <Link to="/kelolatransaksi" className="back-button">
        <FiArrowLeft /> Kembali
      </Link>

      <h2>Detail Transaksi - {transaksi.id}</h2>
      <div className="info-transaksi">
        <p>
          <strong>Pembeli:</strong> {transaksi.pembeli}
        </p>
        <p>
          <strong>Alamat Pengiriman:</strong> {transaksi.alamatPengiriman}
        </p>
        <p>
          <strong>Tanggal Order:</strong> {transaksi.tanggalOrder}
        </p>
        <p>
          <strong>Metode Pembayaran:</strong> {transaksi.metodePembayaran}
        </p>
        <p>
          <strong>Status:</strong> {transaksi.status}
        </p>
      </div>

      <h3>Produk yang Dibeli</h3>
      <table className="detail-table">
        <thead>
          <tr>
            <th>Gambar</th>
            <th>Nama Produk</th>
            <th>Kategori</th>
            <th>Harga Satuan</th>
            <th>Jumlah</th>
            <th>Nama Toko</th>
            <th>Total Bayar Toko</th>
          </tr>
        </thead>
        <tbody>
          {transaksi.produk.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="produk-image"
                />
              </td>
              <td>{item.nama}</td>
              <td>{item.kategori}</td>
              <td>Rp {item.harga.toLocaleString()}</td>
              <td>{item.jumlah}</td>
              <td>{item.toko}</td>
              <td>Rp {item.totalBayarToko.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total Harga: Rp {transaksi.totalHarga.toLocaleString()}</h3>
    </div>
  );
}
