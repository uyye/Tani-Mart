import React from "react";
import ProductCard from "../produk/ProdukCard";
import "./ProdukCard";
import "./Produk.css";
const ProductPage = () => {
  const products = [
    {
      id: 1,
      name: "Wortel",
      price: 15000,
      unit: "kg",
      imageUrl: "path_to_image1",
    },
    {
      id: 2,
      name: "Bayam",
      price: 10000,
      unit: "ikat",
      imageUrl: "path_to_image2",
    },
    {
      id: 3,
      name: "Kentang",
      price: 12000,
      unit: "kg",
      imageUrl: "path_to_image3",
    },
  ];

  return (
    <div className="product-page">
      <h1>Produk Siafarm</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
