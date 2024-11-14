import React, { useState } from "react";
import "./Checkout.css";

function CheckoutFeature() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = () => {
    if (details.name && details.phone && details.address && paymentMethod) {
      setOrderConfirmed(true);
      alert(`Pesanan Anda telah diterima!`);
    } else {
      alert("Mohon lengkapi semua detail dan pilih metode pembayaran.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {!orderConfirmed ? (
        <>
          <div className="checkout-details">
            <label>Nama Lengkap:</label>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={handleChange}
              placeholder="Nama Anda"
            />

            <label>No. Telepon:</label>
            <input
              type="text"
              name="phone"
              value={details.phone}
              onChange={handleChange}
              placeholder="Nomor Telepon"
            />

            <label>Alamat Pengiriman:</label>
            <input
              type="text"
              name="address"
              value={details.address}
              onChange={handleChange}
              placeholder="Alamat Lengkap"
            />
          </div>

          <div className="payment-method">
            <h3>Pilih Metode Pembayaran:</h3>
            <label>
              <input
                type="radio"
                value="transfer"
                checked={paymentMethod === "transfer"}
                onChange={handlePaymentMethodChange}
              />
              Transfer Bank
            </label>
            <label>
              <input
                type="radio"
                value="ewallet"
                checked={paymentMethod === "ewallet"}
                onChange={handlePaymentMethodChange}
              />
              E-Wallet
            </label>
          </div>

          <button className="confirm-order-button" onClick={handleCheckout}>
            Konfirmasi Pesanan
          </button>
        </>
      ) : (
        <div className="order-confirmation">
          <h3>Terima Kasih atas Pesanan Anda!</h3>
          <p>Kami akan segera memproses pesanan Anda.</p>
        </div>
      )}
    </div>
  );
}

export default CheckoutFeature;
