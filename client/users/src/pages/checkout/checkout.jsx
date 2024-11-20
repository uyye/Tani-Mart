import React, { useState } from "react";
import "./checkout.css";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");

  const handlePaymentChange = (e) => setSelectedPayment(e.target.value);
  const handleShippingChange = (e) => setShippingMethod(e.target.value);
  const adminContact = {
    whatsapp: "+62 812-3456-7890",
  };

  const buyerContact = {
    whatsapp: "+62 877-7763-5123",
  };
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Alamat Pengiriman */}
      <div className="section">
        <h2>Alamat Pengiriman</h2>
        <textarea
          className="address-input"
          placeholder="Masukkan alamat pengiriman lengkap"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
      </div>

      {/* Detail Produk */}
      <div className="section">
        <h2>Detail Produk</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Quantity</th>
              <th>Harga Satuan</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Produk 1</td>
              <td>2</td>
              <td>Rp50,000</td>
              <td>Rp100,000</td>
            </tr>
            <tr>
              <td>Produk 2</td>
              <td>1</td>
              <td>Rp75,000</td>
              <td>Rp75,000</td>
            </tr>
          </tbody>
        </table>
        <p className="total">Total: Rp175,000</p>
      </div>

      {/* Metode Pembayaran */}
      <div className="section2">
        <h2>Metode Pembayaran</h2>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="va"
              onChange={handlePaymentChange}
            />
            Virtual Account
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="transfer"
              onChange={handlePaymentChange}
            />
            Transfer Bank
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              onChange={handlePaymentChange}
            />
            Cash on Delivery (COD)
          </label>
        </div>
      </div>
      {/* Kontak WhatsApp */}
      <div className="section1">
        <h2>Kontak Pengiriman</h2>
        <p>
          <strong>Admin:</strong>{" "}
          <a
            href={`https://web.whatsapp.com/${adminContact.whatsapp.replace(
              "+",
              ""
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {adminContact.whatsapp}
          </a>
        </p>
        <p>
          <strong>Penjual:</strong>{" "}
          <a
            href={`https://wa.me/${buyerContact.whatsapp.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buyerContact.whatsapp}
          </a>
        </p>
      </div>
      {/* Konfirmasi dan Submit */}
      <div className="section">
        <button className="checkout-button">Lakukan Pembayaran</button>
      </div>
    </div>
  );
};

export default Checkout;
