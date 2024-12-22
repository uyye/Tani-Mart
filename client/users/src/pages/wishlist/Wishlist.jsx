import React from "react";
import "./Wishlist.css";
const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: "Produk 1",
      price: 50000,
      stock: 10,
      stockStatus: "Tersedia",
    },
    { id: 2, name: "Produk 2", price: 75000, stock: 0, stockStatus: "Habis" },
    {
      id: 3,
      name: "Produk 3",
      price: 120000,
      stock: 5,
      stockStatus: "Tersedia",
    },
    { id: 4, name: "Produk 4", price: 75000, stock: 0, stockStatus: "Habis" },
    {
      id: 5,
      name: "Produk 5",
      price: 120000,
      stock: 5,
      stockStatus: "Tersedia",
    },
  ];

  const handleDelete = (id) => {
    console.log(`Hapus produk dengan ID: ${id}`);
  };

  const handleAddToCart = (id) => {
    console.log(`Tambah produk dengan ID: ${id} ke keranjang`);
  };

  return (
    <header className="app">
      <h1>Wishlist</h1>
      <div className="wishlist-container">
        {wishlistItems.map((item) => (
          <div className="wishlist-card" key={item.id}>
            <div className="wishlist-content">
              <h3 className="product-name">{item.name}</h3>
              <p className="product-price">
                Harga: Rp {item.price.toLocaleString()}
              </p>
              <p className="product-stock">Stok: {item.stock}</p>
              <p
                className={`stock-status ${
                  item.stock > 0 ? "available" : "unavailable"
                }`}
              >
                {item.stockStatus}
              </p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
              >
                Hapus
              </button>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(item.id)}
              disabled={item.stock === 0}
            >
              Add to Keranjang
            </button>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Wishlist;
