import React, { useEffect, useState } from "react";
import "./Produk.css"; // Import file CSS terpisah
import instance from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const categories = [
  "Semua",
  "Sayur-sayuran",
  "Buah-buahan",
  "Umbi-umbian",
  "Rempah-rempah",
  "Produk Organik",
  "Presale",
];
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const fetchProduct = async () => {
    try {
      const { data } = await instance({
        method: "get",
        url: "/products/admin",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setProducts(data);
      setFilteredProducts(data); // Initialize filtered products
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    const result = await Swal.fire({
      position: "center",
      icon: "warning",
      title: "Serius!",
      text: "Kamu ingin menghapus produk ini?",
      showCancelButton: true,
      confirmButtonText: "Lanjutkan",
      cancelButtonText: "Batal",
    });
    if (result.isConfirmed) {
      try {
        await instance({
          method: "delete",
          url: `/products/${id}`,
          headers: {
            Authorization: `bearer ${localStorage.getItem("access_token")}`,
          },
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "delete successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        fetchProduct();
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Gagal!",
          text: "Gagal Menghapus Produk",
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(error);
      }
    }
  };
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === "Semua") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="table-container">
      <h1>Daftar Produk & Daftar Presale</h1>

      {/* Tombol Filter Kategori */}
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => filterByCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <p>Presale</p>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>Rp {product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="btn-update">
                    <Link to={`/Input/${product.id}`}>Update</Link>
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteProduct(product.id)}
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
