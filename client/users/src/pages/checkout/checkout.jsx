import React, { useState } from "react";
import "./checkout.css";
import instance from "../../api/axiosInstance";
import { useLocation } from "react-router-dom";
import { MapPin, Truck, CreditCard, Shield } from "lucide-react";

function Checkout() {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("regular");
  const [note, setNote] = useState("");

  // Data produk palsu, ganti dengan data asli jika tersedia
  const products = [
    {
      id: 1,
      name: "iPhone 13 Pro Max",
      price: 15999000,
      quantity: 1,
      seller: "Apple Official Store",
      image:
        "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
      id: 2,
      name: "AirPods Pro",
      price: 3999000,
      quantity: 2,
      seller: "Apple Official Store",
      image:
        "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&q=80&w=150&h=150",
    },
  ];

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const shippingCost = selectedShipping === "regular" ? 20000 : 45000;
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    if (!address || !phoneNumber) {
      alert("Please fill in all required fields");
      return;
    }
    // Implementasikan integrasi payment gateway di sini
    console.log("Processing checkout...", {
      address,
      phoneNumber,
      products,
      shipping: selectedShipping,
      note,
      total,
    });
  };

  return (
    <div className="checkout-container">
      <div className="checkout-wrapper">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-grid">
          {/* Kolom Kiri - Detail Pesanan */}
          <div className="order-details">
            {/* Delivery Address */}
            <div className="card delivery-address">
              <div className="card-header">
                <MapPin className="icon" />
                <h2 className="card-title">Alamat Pengiriman</h2>
              </div>
              <textarea
                className="input-textarea"
                rows="3"
                placeholder="Masukkan alamat lengkap Anda"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="tel"
                className="input-field"
                placeholder="Masukkan Nomor Telepon"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Products */}
            <div className="card products-list">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <p className="seller-name">{product.seller}</p>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-quantity">
                      Quantity: {product.quantity}
                    </p>
                    <p className="product-price">
                      Rp {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Method
            <div className="card shipping-method">
              <div className="card-header">
                <Truck className="icon" />
                <h2 className="card-title">Shipping Method</h2>
              </div>
              <div className="shipping-options">
                <label className="shipping-option">
                  <input
                    type="radio"
                    name="shipping"
                    value="regular"
                    checked={selectedShipping === "regular"}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                  />
                  <div className="shipping-info">
                    <p className="shipping-name">Regular Delivery (2-3 days)</p>
                    <p className="shipping-price">Rp 20.000</p>
                  </div>
                </label>
                <label className="shipping-option">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={selectedShipping === "express"}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                  />
                  <div className="shipping-info">
                    <p className="shipping-name">Express Delivery (1 day)</p>
                    <p className="shipping-price">Rp 45.000</p>
                  </div>
                </label>
              </div>
            </div> */}

            {/* Order Note */}
            <div className="card order-note">
              <h2 className="card-title">Catatan Pemesanan (Opsional)</h2>
              <textarea
                className="input-textarea"
                rows="2"
                placeholder="Tambahkan catatan untuk penjual
"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          {/* Kolom Kanan - Ringkasan Pesanan */}
          <div className="order-summary">
            <div className="card summary-card">
              <h2 className="card-title">Ringkasan Pemesanan</h2>
              <div className="summary-details">
                <div className="summary-item">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString()}</span>
                </div>
                {/* <div className="summary-item">
                  <span>Shipping</span>
                  <span>Rp {shippingCost.toLocaleString()}</span>
                </div> */}
                <div className="summary-divider"></div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString()}</span>
                </div>
              </div>
              <button onClick={handleCheckout} className="checkout-button">
                <CreditCard className="button-icon" size={20} />
                Bayar Sekarang
              </button>
              <div className="security-note">
                <Shield className="icon" size={16} />
                <span>Secure payment guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
