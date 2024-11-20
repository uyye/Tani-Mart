import React, { useState } from "react";
import "./Detail.css";
import gambar from "../../assets/wortel.jpg";
import { Link } from "react-router-dom";

export default function DetailProduk() {
  const [quantity, setQuantity] = useState(1); // State untuk kuantitas

  const product = {
    Image: gambar,
    name: "Wortel",
    price: "Rp 50.000/kg",
    description:
      "Wortel segar dan berkualitas tinggi, langsung dari petani lokal. Kaya akan vitamin A dan nutrisi lainnya yang bermanfaat untuk kesehatan mata, kulit, dan sistem kekebalan tubuh.",
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1); // Tambah kuantitas
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Kurangi kuantitas, minimal 1
    }
  };

  return (
    <div className="detail-product-container">
      <img src={product.Image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{product.price}</p>
      <p className="product-unit">{product.unit}</p>
      <p className="product-description">{product.description}</p>

      {/* Tombol Kuantitas */}
      <div className="quantity-container">
        <button onClick={handleDecrease} className="quantity-button">
          -
        </button>
        <span className="quantity-display">{quantity}</span>
        <button onClick={handleIncrease} className="quantity-button">
          +
        </button>
      </div>

      <Link to="/checkout" className="contact-button2">
        Beli Sekarang
      </Link>
      <Link to="/keranjang" className="contact-button2">
        Masukkan Keranjang
      </Link>
    </div>
  );
}
