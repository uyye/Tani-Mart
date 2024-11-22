import React, { useState } from "react";
import "./Produk.css"; // Import file CSS terpisah

const ProductTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Tomat",
      price: 10000,
      stock: 50,
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Cabai",
      price: 15000,
      stock: 20,
      image: "https://via.placeholder.com/50",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  });

  // Mengupdate produk
  const handleUpdate = (id) => {
    const productName = prompt("Masukkan nama produk baru:");
    const productPrice = prompt("Masukkan harga produk baru:");
    const productStock = prompt("Masukkan stok produk baru:");
    const productImage = prompt("Masukkan URL gambar produk baru:");

    if (productName && productPrice && productStock && productImage) {
      setProducts(
        products.map((product) =>
          product.id === id
            ? {
                ...product,
                name: productName,
                price: parseFloat(productPrice),
                stock: parseInt(productStock, 10),
                image: productImage,
              }
            : product
        )
      );
    }
  };

  // Menghapus produk
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="table-container">
      <h1>Daftar Produk</h1>
      {/* Tabel Produk */}
      <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>{product.name}</td>
                <td>Rp {product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    className="btn-update"
                    onClick={() => handleUpdate(product.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                Tidak ada produk
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
