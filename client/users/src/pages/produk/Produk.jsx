import React, { useEffect, useState } from "react";
import "./Produk.css";
import { Link } from "react-router-dom";
import instance from "../../api/axiosInstance";

const categories = [
  "Semua",
  "Sayur-sayuran",
  "Buah-buahan",
  "Umbi-umbian",
  "Rempah-rempah",
  "Produk Organik",
  "Produk Lainya",
  "Presale",
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
          <p className="store-name">Toko: {product.storeName || "Tidak Ada"}</p>
          <p>Harga: Rp {product.price.toLocaleString()} / Kg</p>
          <p className="sold-count">Terjual: {product.sold || 0} kg</p>
          <p className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
            {product.stock > 0 ? `Stok: ${product.stock} Kg` : "Out of Stock"}
          </p>
          <p className="rating">⭐ {product.rating || "0.0"} / 5.0</p>
        </div>
      </div>
    </Link>
  );
};

const Produk = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchProducts = async () => {
    try {
      let filter = selectedCategory !== "Semua" ? selectedCategory : null;

      // Jika memilih kategori "Presale", maka hanya tampilkan produk Presale
      if (selectedCategory === "Presale") {
        filter = "presale";
      }

      const { data } = await instance.get("/products", {
        params: { filter, search: searchKeyword },
      });

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchKeyword]);

  // Pisahkan produk reguler dan presale
  const regularProducts = products.filter((p) => p.productStatus !== "presale");
  const presaleProducts = products.filter((p) => p.productStatus === "presale");

  return (
    <div className="App">
      <header className="app-header">
        <h1>Produk Siafarm</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Cari produk..."
            className="search-input"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button className="search-button">Cari</button>
        </div>
      </header>

      {/* Kategori */}
      <section className="categories">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>

      <main>
        {/* Produk Reguler */}
        {regularProducts.length > 0 && selectedCategory !== "Presale" && (
          <section className="product-section">
            <h2 className="section-title">Produk Reguler</h2>
            <div className="product-list">
              {regularProducts.map((x, y) => (
                <ProductCard key={y} product={x} />
              ))}
            </div>
          </section>
        )}

        {/* Produk Presale */}
        {presaleProducts.length > 0 && (
          <section className="product-section">
            <h2 className="section-title">Produk Presale</h2>
            <div className="product-list">
              {presaleProducts.map((x, y) => (
                <ProductCard key={y} product={x} />
              ))}
            </div>
          </section>
        )}

        {/* Jika tidak ada produk */}
        {regularProducts.length === 0 && presaleProducts.length === 0 && (
          <p className="no-products">Tidak ada produk yang ditemukan.</p>
        )}
      </main>
    </div>
  );
};

export default Produk;
