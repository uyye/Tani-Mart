// ReactJS Code
import React, { useState } from "react";
import "./KelolaProduk.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      nama: "Tomat",
      kategori: "Buah",
      harga: 20000,
      stok: 50,
      deskripsi: "dsmvfsokffdnjgfdvfdvnfdvfdjvfdvsfv",
      gambar: "gambar",
      status: "Reguler",
      tanggalOrder: "-",
      diskon: "-",
    },
    {
      id: 2,
      nama: "Sawi",
      kategori: "Sayur",
      harga: 3000,
      stok: 420,
      deskripsi: "dsmvfsokffdnjgfdvfdvnfdvfdjvfdvsfv",
      gambar: "gambar",
      status: "Presale",
      tanggalOrder: "23/04/2025",
      diskon: "10%",
    },
  ]);

  const handleUpdateProduct = (id) => {
    console.log(`Update product with ID: ${id}`);
    // Add update logic here
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    console.log(`Delete product with ID: ${id}`);
  };

  return (
    <div className="manage-products">
      <h1>Kelola Produk</h1>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Produk</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Deskripsi</th>
            <th>Gambar</th>
            <th>Status</th>
            <th>Tanggal Order</th>
            <th>Diskon</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nama}</td>
              <td>{product.kategori}</td>
              <td>Rp{product.harga.toLocaleString()}</td>
              <td>{product.stok}</td>
              <td>{product.deskripsi}</td>
              <td>{product.gambar}</td>
              <td>{product.status}</td>
              <td>{product.tanggalOrder}</td>
              <td>{product.diskon}</td>
              <td>
                <button onClick={() => handleUpdateProduct(product.id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
