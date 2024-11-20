import React, { useState } from "react";
import "./Produk.css";
import { Link } from "react-router-dom";
const products = [
  {
    id: 1,
    name: "Tomat Segar",
    price: 10000,
    discount: 20,
    stok: 150,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Kentang Organik",
    price: 15000,
    discount: 10,
    stok: 200,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    name: "Wortel Premium",
    price: 12000,
    discount: 15,
    stok: 50,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 4,
    name: "Bayam Fresh",
    price: 8000,
    discount: 5,
    stok: 300,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 5,
    name: "kangkung",
    price: 8000,
    discount: 5,
    stok: 300,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "lombok",
    price: 8000,
    discount: 5,
    stok: 300,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    name: "jagung",
    price: 8000,
    discount: 5,
    stok: 300,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    name: "cengkeh",
    price: 8000,
    discount: 5,
    stok: 300,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    name: "jagung manis",
    price: 8000,
    discount: 5,
    stok: 300,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    name: "bawang merah",
    price: 8000,
    discount: 5,
    stok: 300,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 11,
    name: "terong",
    price: 8000,
    discount: 5,
    stok: 300,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 12,
    name: "sawi",
    price: 8000,
    discount: 5,
    stok: 300,
    image: "https://via.placeholder.com/150",
  },
];

const ProductCard = ({ product }) => {
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <Link to="/detail" className="product-link">
      <div className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price">
            <span className="price-discounted">
              Rp {discountedPrice.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <span className="price-original">
                Rp {product.price.toLocaleString()}
              </span>
            )}
          </div>
          {product.discount > 0 && (
            <span className="product-badge">{product.discount}% OFF</span>
          )}
          {/* <h2>{product.name}</h2> */}
          {/* <p>Price: Rp {product.price}</p> */}
          <p className={product.stok > 0 ? "in-stock" : "out-of-stock"}>
            {product.stok > 0 ? `Stok: ${product.stok}` : "Out of Stock"}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Produk = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Produk Siafarm</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Cari
          </button>
        </div>
      </header>
      <main>
        <div className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Produk;
