import React from "react";
import "./Detail.css";
import gambar from "../../assets/wortel.jpg";
import { Link } from "react-router-dom";

function DetailProduk() {
  const product = {
    Image: gambar,
    name: "Wortel",
    unit: "pcs/satuan/kg",
    price: "Rp 50.000",
    description:
      "Ini adalah deskripsi singkat produk yang menjelaskan kegunaan, kualitas, dan informasi penting lainnya.",
    phoneNumber: "08777635123",
  };

  return (
    <div className="detail-product-container">
      <img src={product.Image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{product.price}</p>
      <p className="product-unit">{product.unit}</p>
      <p className="product-description">{product.description}</p>
      <Link to="/keranjang" className="contact-button2">
        Masukkan Keranjang
      </Link>
    </div>
  );
}

export default DetailProduk;
{
  /* <Link to="/product" className="cta">
  Beli Sekarang
</Link>; */
}
