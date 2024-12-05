import React, { useEffect, useState } from "react";
import "./Produk.css";
import { Link } from "react-router-dom";
import instance from "../../api/axiosInstance";


const ProductCard = ({ product }) => {
  return (
    <Link to={`/detail/${product.id}`} className="product-link">
      <div className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p>Price: Rp {product.price.toLocaleString()} / Kg</p>
          <p className={(product.stock) > 0 ? "in-stock" : "out-of-stock"}>
            {product.stock > 0 ? `Stok: ${product.stock} Kg` : "Out of Stock"}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Produk = () => {
  const [products , setProducts] = useState([])

  const fetchProducts = async()=>{
    try {
      const {data} = await instance({
        method:"get",
        url:"/products"
      })
      setProducts(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchProducts()
  }, [])

  console.log(products);
  

  return (
    <div className="App">
      <header className="app-header">
        <h1>Produk Siafarm</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Cari produk..."
            className="search-input"
          />
          <button  className="search-button">
            Cari
          </button>
        </div>
      </header>
      <main>
        <div className="product-list">
         {
          products.map((x, y)=>{
            return(
              <ProductCard key={y + 1} product={x}/>
            )
          })
         }
        </div>
      </main>
    </div>
  );
};

export default Produk;
