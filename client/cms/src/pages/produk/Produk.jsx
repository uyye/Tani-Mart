import React, { useEffect, useState } from "react";
import "./Produk.css"; // Import file CSS terpisah
import instance from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataProductBySeller,
  setFilter,
  setSearch,
} from "../../features/products/productSlice";

const categories = [
  "Semua",
  "Sayur-sayuran",
  "Buah-buahan",
  "Umbi-umbian",
  "Rempah-rempah",
  "Produk Organik",
  "Produk Lainya",
];

const ProductTable = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activeTab, setActiveTab] = useState("reguler"); // State untuk tab aktif

  const { products, search, filter } = useSelector((state) => state.products);
  console.log(products);

  const handleFilterCategory = (category) => {
    // Update state local untuk penampilan background tombol aktif
    setSelectedCategory(category);
    if (category === "Semua") {
      dispatch(setFilter());
    } else {
      dispatch(setFilter(category));
    }
  };

  const handleSearchProduct = (keyword) => {
    console.log(keyword, "INI KEYWORD");
    dispatch(setSearch(keyword));
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
        // Pastikan untuk memanggil kembali data produk setelah menghapus
        dispatch(fetchDataProductBySeller());
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

  useEffect(() => {
    dispatch(fetchDataProductBySeller());
  }, [dispatch, search, filter]);

  // Pisahkan produk reguler dan presale
  const regularProducts = products.filter(
    (product) => product.productStatus === "regular"
  );

  const preSaleProducts = products.filter(
    (product) => product.productStatus === "presale"
  );

  return (
    <div className="table-container">
      <header className="app-header">
        <h1>Daftar Produk</h1>
        <div className="search-bar">
          <input
            type="search"
            placeholder="Cari produk..."
            className="search-input"
            value={search}
            onChange={(e) => handleSearchProduct(e.target.value)}
          />
          <button className="search-button">Cari</button>
        </div>
      </header>

      {/* Tombol Filter Kategori */}
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleFilterCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tab Produk Reguler dan Pre-sale */}
      <div className="product-tabs">
        <button
          className={`tab-button ${activeTab === "reguler" ? "active" : ""}`}
          onClick={() => setActiveTab("reguler")}
        >
          Produk Reguler
        </button>
        <button
          className={`tab-button ${activeTab === "presale" ? "active" : ""}`}
          onClick={() => setActiveTab("presale")}
        >
          Presale
        </button>
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
            <th>Izin</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {activeTab === "reguler" ? (
            regularProducts.length > 0 ? (
              regularProducts.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="product-image-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                      <p className="product-status regular">Reguler</p>
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>Rp {product.price.toLocaleString()}</td>
                  <td>{product.stock}</td>
                  <td>{product.permission}</td>
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
                <td colSpan="7" className="no-data">
                  Tidak ada produk reguler
                </td>
              </tr>
            )
          ) : preSaleProducts.length > 0 ? (
            preSaleProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <p className="product-status pre-sale">Presale</p>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>Rp {product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>{product.permission}</td> {/* Tambahkan kolom Permission */}
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
              <td colSpan="7" className="no-data">
                Tidak ada produk presale
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
