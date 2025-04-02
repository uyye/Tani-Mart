import React, { useEffect, useState } from "react";
import "./Produk.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataProduct,
  setFilter,
  setSearch,
} from "../../features/products/productSlice";

const categories = [
  "Semua",
  "Sayur-sayuran",
  "Buah-buahan",
  "Umbi-umbian",
  "Rempah-rempah",
  "Organik",
  "Produk Lainya",
];

const ProductCard = ({ product }) => {
  return (
    <Link to={`/detail/${product.id}`} className="product-link">
      <div className="product-card">
        <div className="image-container">
          {product.productStatus === "presale" && (
            <span className="presale-badge">Presale</span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="store-name">Toko: {product.User.name || "Tidak Ada"}</p>
          <p>Harga: Rp {product.price.toLocaleString()} / Kg</p>
          <p className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
            {product.stock > 0 ? `Stok: ${product.stock} Kg` : "Out of Stock"}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Produk = () => {
  const dispatch = useDispatch();
  const { products, search, filter } = useSelector(
    (state) => state.dataProducts
  );
  const [activeTab, setActiveTab] = useState("reguler");
  
  console.log(products, ">>>>>>>");
  

  const filterProduct = (category) => {
    if (category === "Semua") {
      dispatch(setFilter());
    } else {
      dispatch(setFilter(category));
    }
  };

  const searchProduct = (keyword) => {
    dispatch(setSearch(keyword));
  };

  useEffect(() => {
    dispatch(fetchDataProduct());
  }, [dispatch, search, filter]);

  // Pisahkan produk reguler dan presale
  const regularProducts = products.filter((p) => p.productStatus !== "presale");
  const presaleProducts = products.filter((p) => p.productStatus === "presale");

  // Tentukan produk yang akan ditampilkan berdasarkan tab aktif
  const displayedProducts =
    activeTab === "reguler" ? regularProducts : presaleProducts;

  return (
    <div className="App">
      <header className="app-header">
        <h1>Produk Siafarm</h1>
        <div className="search-bar">
          <input
            type="search"
            placeholder="Cari produk..."
            className="search-input"
            value={search}
            onChange={(e) => searchProduct(e.target.value)}
          />
          <button className="search-button">Cari</button>
        </div>
      </header>

      {/* Tombol Kategori */}
      <section className="categories">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${filter === category ? "active" : ""}`}
            onClick={() => filterProduct(category)}
          >
            {category}
          </button>
        ))}
      </section>

      {/* Tombol Tab untuk Produk Reguler dan Presale */}
      <section className="tab-buttons">
        <button
          className={`category-button ${
            activeTab === "reguler" ? "active" : ""
          }`}
          onClick={() => setActiveTab("reguler")}
        >
          Produk Reguler
        </button>
        <button
          className={`category-button ${
            activeTab === "presale" ? "active" : ""
          }`}
          onClick={() => setActiveTab("presale")}
        >
          Produk Presale
        </button>
      </section>

      <main>
        {displayedProducts.length > 0 ? (
          <section className="product-section">
            <h2 className="section-title">
              {activeTab === "reguler" ? "Produk Reguler" : "Produk Presale"}
            </h2>
            <div className="product-list">
              {displayedProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </section>
        ) : (
          <p className="no-products">Tidak ada produk yang ditemukan.</p>
        )}
      </main>
    </div>
  );
};

export default Produk;
