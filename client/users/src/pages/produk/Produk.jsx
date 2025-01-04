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
];

const ProductCard = ({ product }) => {
  return (
    <Link to={`/detail/${product.id}`} className="product-link">
      <div className="product-card">
        <div className="image-container">
          {product.productStatus === "presale" && <span className="presale-badge">Presale</span>}
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
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
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchProducts = async () => {
    try {
      const filter = selectedCategory !== "Semua" ? selectedCategory : null;

      const { data } = await instance({
        method: "get",
        url: "/products",
        params: {
          filter,
          search: searchKeyword,
        },
      });
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchKeyword]);

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
        <div className="product-list">
          {products.length > 0 ? (
            products.map((x, y) => <ProductCard key={y + 1} product={x} />)
          ) : (
            <p>Tidak ada produk yang ditemukan.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Produk;
