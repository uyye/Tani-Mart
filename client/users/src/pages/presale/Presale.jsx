import React, { useState } from "react";
import "./Presale.css";
import { Link } from "react-router-dom";
function Presale() {
  const [quantity, setQuantity] = useState(1); // State untuk kuantitas
  const presaleProducts = [
    {
      id: 1,
      name: "Tomat Segar",
      price: "10000",
      harvestDate: "2024-11-25",
      sellableDate: "2024-11-23",
      image: "https://via.placeholder.com/150?text=Tomat+Segar", // Gambar produk
    },
    {
      id: 2,
      name: "Kentang",
      price: "15000",
      harvestDate: "2024-11-28",
      sellableDate: "2024-11-26",
      image: "https://via.placeholder.com/150?text=Cabai+Merah", // Gambar produk
    },
    {
      id: 3,
      name: "Wortel ",
      price: "15000",
      harvestDate: "2024-11-28",
      sellableDate: "2024-11-26",
      image: "https://via.placeholder.com/150?text=Cabai+Merah", // Gambar produk
    },
    {
      id: 4,
      name: "Bayam",
      price: "15000",
      harvestDate: "2024-11-28",
      sellableDate: "2024-11-26",
      image: "https://via.placeholder.com/150?text=Cabai+Merah", // Gambar produk
    },
    {
      id: 5,
      name: "Kangkung",
      price: "15000",
      harvestDate: "2024-11-28",
      sellableDate: "2024-11-26",
      image: "https://via.placeholder.com/150?text=Cabai+Merah", // Gambar produk
    },
    {
      id: 6,
      name: "Cabai Geriting",
      price: "15000",
      harvestDate: "2024-11-28",
      sellableDate: "2024-11-26",
      image: "https://via.placeholder.com/150?text=Cabai+Merah", // Gambar produk
    },
    {
      id: 7,
      name: "Jagung",
      price: "15000",
      harvestDate: "2024-11-28",
      sellableDate: "2024-11-26",
      image: "https://via.placeholder.com/150?text=Cabai+Merah", // Gambar produk
    },
    {
      id: 8,
      name: "Cengkeh",
      price: "15000",
      harvestDate: "2024-11-28",
      sellableDate: "2024-11-26",
      image: "https://via.placeholder.com/150?text=Cabai+Merah", // Gambar produk
    },
    {
      id: 9,
      name: "Jagung Manis",
      price: "15000",
      harvestDate: "2024-11-28",
      sellableDate: "2024-11-26",
      image: "https://via.placeholder.com/150?text=Cabai+Merah", // Gambar produk
    },
    {
      id: 10,
      name: "Bawang Merah",
      price: "15000",
      harvestDate: "2024-11-28",
      sellableDate: "2024-11-26",
      image: "https://via.placeholder.com/150?text=Cabai+Merah", // Gambar produk
    },
    {
      id: 11,
      name: "Terong",
      price: "15000",
      harvestDate: "2024-11-28",
      sellableDate: "2024-11-26",
      image: "https://via.placeholder.com/150?text=Cabai+Merah", // Gambar produk
    },
    {
      id: 12,
      name: "Sawi",
      price: "15000",
      harvestDate: "2024-11-28",
      sellableDate: "2024-11-26",
      image: "https://via.placeholder.com/150?text=Cabai+Merah", // Gambar produk
    },
  ];
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const buyProduct = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  return (
    <div className="presale-buyer">
      <header className="App-header">
        <h1>Produk Presale</h1>
      </header>
      <div className="product-grid">
        {presaleProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Harga: Rp{product.price}/kg</p>
            <p>Panen: {product.harvestDate}</p>
            <p>Tersedia Mulai: {product.sellableDate}</p>
            <button onClick={() => addToCart(product)}>
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>

      <div className="cart-section">
        <h2>Keranjang Anda</h2>
        {cart.length === 0 ? (
          <p>Keranjang kosong</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Tanggal Panen</th>
                <th>Layak Jual</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="cart-image"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>Rp{product.price}</td>
                  <td>{product.harvestDate}</td>
                  <td>{product.sellableDate}</td>
                  <td>
                    <Link to="/checkout" className="Buy-Now">
                      Checkout
                    </Link>
                    <button onClick={() => removeFromCart(product.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Presale;
