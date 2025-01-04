// ReactJS Code for Product Detail Page
import React from "react";
import "./DetailProduk.css";

const ProductDetail = ({ product }) => {
  return (
    <div className="product-detail">
      <h1>Detail Produk</h1>
      <div className="detail-container">
        <div className="detail-item">
          <label>ID Produk:</label>
          <p>{product.id}</p>
        </div>
        <div className="detail-item">
          <label>Nama:</label>
          <p>{product.name}</p>
        </div>
        <div className="detail-item">
          <label>Kategori:</label>
          <p>{product.category}</p>
        </div>
        <div className="detail-item">
          <label>Harga:</label>
          <p>{product.price}</p>
        </div>
        <div className="detail-item">
          <label>Stok:</label>
          <p>{product.stock}</p>
        </div>
        <div className="detail-item">
          <label>Deskripsi:</label>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

// Example usage
const exampleProduct = {
  id: 101,
  name: "Fresh Tomatoes",
  category: "Vegetables",
  price: "20.00 USD",
  stock: 100,
  description: "Organic and freshly harvested tomatoes.",
};

export default function App() {
  return <ProductDetail product={exampleProduct} />;
}
