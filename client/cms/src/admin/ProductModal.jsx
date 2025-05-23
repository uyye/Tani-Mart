// UpdateModal.js
import React, { useEffect, useState } from "react";
import "./productModal.css";

const ProductModal = ({ product, isOpen, onClose, onUpdate }) => {
  console.log(product, "INI DATA PRODUCT");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    productStatus: "",
    discount: "",
    startDate: "",
  });

  const [image, setImage] = useState(null);

  const handleIMageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = { startDate: "", discount: "" };

    if (formData.productStatus === "presale") {
      if (!formData.startDate) {
        validationErrors.startDate =
          "Tanggal order wajib diisi untuk produk presale.";
      }
      if (!formData.discount) {
        validationErrors.discount = "Diskon wajib diisi untuk produk presale.";
      }
    }

    setErrors(validationErrors);

    // Hentikan proses jika ada error
    if (validationErrors.startDate || validationErrors.discount) {
      return;
    }

    const newData = { ...formData, file: image };
    onUpdate(newData);
    onClose();
  };

  const [errors, setErrors] = useState({
    startDate: "",
    discount: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        productStatus: product.productStatus || "",
        discount: product.discount || "",
        startDate: product.startDate || "",
      });
    }
  }, [product]);
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Data Produk</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-layout">
            <div>
              <label>
                Nama:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Kategori:
                <select
                  required
                  name="category"
                  value={formData.category}
                  className="select-form"
                  onChange={handleChange}
                >
                  <option value="" disabled></option>
                  <option value="Sayur-sayuran">Sayur</option>
                  <option value="Buah-buahan">Buah</option>
                  <option value="Umbi-umbian">Umbi</option>
                  <option value="Rempah-rempah">Rempah</option>
                  <option value="Produk Organik">Organik</option>
                </select>
              </label>
              <label>
                Harga:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Stok:
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Deskripsi:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </label>
              <label>
                Gambar:
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleIMageChange}
                  // required
                />
              </label>
              <label>
                Status:
                <select
                  name="productStatus"
                  value={formData.productStatus}
                  className="select-form"
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled></option>
                  <option value="regular">Reguler</option>
                  <option value="presale">Presale</option>
                </select>
              </label>
              <label>
                Tanggal Order (kosongkan jika reguler):
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate || ""}
                  onChange={handleChange}
                />
                {errors.startDate && (
                  <p className="error-text">{errors.startDate}</p>
                )}
              </label>
              <label>
                Diskon (kosongkan jika reguler):
                <select
                  className="select-form"
                  name="discount"
                  value={formData.discount || ""}
                  onChange={handleChange}
                >
                  <option value="">Pilih Diskon</option>
                  {Array.from({ length: 100 }, (_, i) => i + 1).map((value) => (
                    <option key={value} value={value}>
                      {value}%
                    </option>
                  ))}
                </select>
                {errors.discount && (
                  <p className="error-text">{errors.discount}</p>
                )}
              </label>
            </div>
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Batal
            </button>
            <button type="submit">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
