import React, { useState } from "react";
import "./InputPresale.css";

const InputPresale = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    orderDate: "",
    isSellable: false,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setProduct((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setProduct((prev) => ({ ...prev, image: files[0] }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.name && product.price && product.orderDate) {
      onAddProduct(product);
      alert("Product added successfully!");
      setProduct({
        name: "",
        price: "",
        orderDate: "",
        isSellable: false,
        image: null,
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="admin-presale-input">
      <h1>Tambahkan Presale</h1>
      <form onSubmit={handleSubmit} className="presale-form">
        <div className="form-group">
          <label htmlFor="image">Product Image *</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (Rp) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter product price"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="orderDate">Order Date *</label>
          <input
            type="date"
            id="orderDate"
            name="orderDate"
            value={product.orderDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="isSellable"> Dapat Dijual?</label>
          <input
            type="checkbox"
            id="isSellable"
            name="isSellable"
            checked={product.isSellable}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Tambahkan Produk
        </button>
      </form>
    </div>
  );
};

export default InputPresale;
