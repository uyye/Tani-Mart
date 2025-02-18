import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editPresale.css";
export default function EditPresale() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data dummy untuk sementara (tanpa API & presaleItems)
  const [formData, setFormData] = useState({
    productName: "Tomat",
    price: 10000,
    startDate: "2025-01-01",
    endDate: "2025-02-07",
    stock: 50,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Presale updated:", formData);
    alert("Presale updated successfully!");
    navigate("/Presale"); // Kembali ke halaman utama
  };

  return (
    <div className="containerEdit mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Edit Presale</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 shadow rounded-lg"
      >
        <div className="isi">
          <label className="block font-medium">Nama Produk</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Harga Presale</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Tanggal Mulai</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Tanggal Berakhir</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Stok</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            min="0"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Simpan Perubahan
          </button>
          <button
            type="button"
            onClick={() => navigate("/Presale")}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
