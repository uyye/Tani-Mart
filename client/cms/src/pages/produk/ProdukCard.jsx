import React from "react";
import "./ProdukCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    alert(`${product.name} telah ditambahkan ke keranjang!`);
  };

  return (
    <Link to="/detail">
      <div className="product-card">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">
          Rp {product.price.toLocaleString()} / {product.unit}
        </p>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Tambahkan ke Keranjang
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
