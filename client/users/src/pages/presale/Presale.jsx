import React, { useState } from "react";
import "./Presale.css";

function PresaleForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      alert("Pesan tidak boleh kosong.");
      return;
    }
    // Simpan atau kirim data ke server
    console.log("Pesan Presale:", message);

    // Clear input setelah submit
    setMessage("");
    alert("Pesan Anda telah dikirim ke daftar presale.");
  };

  return (
    <div>
      <h1>Presale Siafarm</h1>
      <form className="presale-form" onSubmit={handleSubmit}>
        <label htmlFor="message">
          Pesan untuk Produk yang Ingin Dipresale:
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tuliskan produk yang ingin Anda pesan..."
          required
        />
        <button type="submit">Daftar Presale</button>
      </form>
    </div>
  );
}

export default PresaleForm;
