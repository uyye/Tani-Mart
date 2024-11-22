import React, { useState } from "react";
import "./CekPresale.css"; // Import file CSS terpisah

const PresaleTable = () => {
  const [presaleData, setPresaleData] = useState([
    {
      id: 1,
      product: "Tomat",
      quantity: 50,
      price: 10000,
      image: "https://via.placeholder.com/50", // URL gambar
    },
    {
      id: 2,
      product: "Cabai",
      quantity: 20,
      price: 15000,
      image: "https://via.placeholder.com/50", // URL gambar
    },
    {
      id: 3,
      product: "Wortel",
      quantity: 30,
      price: 12000,
      image: "https://via.placeholder.com/50", // URL gambar
    },
  ]);

  // Fungsi untuk update
  const handleUpdate = (id) => {
    alert(`Update untuk ID: ${id}`);
  };

  // Fungsi untuk delete
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus item ini?")) {
      setPresaleData(presaleData.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="table-container">
      <h1>Cek Presale</h1>
      <table className="presale-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Produk</th>
            <th>Kuantitas</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {presaleData.length > 0 ? (
            presaleData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.product}
                    className="product-image"
                  />
                </td>
                <td>{item.product}</td>
                <td>{item.quantity}</td>
                <td>Rp {item.price.toLocaleString()}</td>
                <td>
                  <button
                    className="btn-update"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                Tidak ada data presale
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PresaleTable;
