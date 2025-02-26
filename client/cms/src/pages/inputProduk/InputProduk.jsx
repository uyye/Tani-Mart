import React, { useEffect, useState } from "react";
import "./InputProduk.css";
import instance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AddProduct({ page, setModal }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const decode = jwtDecode(token)

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    productStatus: "",
    discount: "",
    startDate: "",
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({
    startDate: "",
    discount: "",
  });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi khusus untuk produk presale
    let validationErrors = { startDate: "", discount: "" };
    if (product.productStatus === "presale") {
      if (!product.startDate) {
        validationErrors.startDate =
          "Tanggal order wajib diisi untuk produk presale.";
      }
      if (!product.discount) {
        validationErrors.discount = "Diskon wajib diisi untuk produk presale.";
      }
    }
    setErrors(validationErrors);

    // Jika ada error validasi, hentikan submit
    if (validationErrors.startDate || validationErrors.discount) {
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("productStatus", product.productStatus);
    formData.append("discount", product.discount);
    formData.append("startDate", product.startDate);
    if (image) {
      formData.append("file", image);
    }

    let method = "post";
    let url = "/products/";
    if (page === "edit") {
      method = "put";
      url = `/products/${id}`;
    }

    try {
      const { data } = await instance({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await Swal.fire({
        title: "Sukses",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      if(decode.role === "seller"){
        navigate("/product")
      }else if(decode.role === "admin"){
        navigate("/kelolaproduk");
        setModal()
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menyimpan data",
        icon: "error",
      });
    }
  };

  const fetchProductById = async () => {
    try {
      const { data } = await instance({
        method: "get",
        url: `/products/${id}`,
      });
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductById();
    }
  }, [id]);

  return (
    <div className={decode.role === "admin"?"modal-overlay":"add-product-container"}>
      <div className={decode.role === "admin"&&"modal-container"}>
      <h1 className="form-title">
        {page === "edit" ? "Edit Produk" : "Tambah Produk"}
      </h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label>Nama Produk:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Masukkan nama produk"
            required
          />
        </div>
        <div className="form-group">
          <label>Kategori:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="select-form"
            required
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            <option value="Sayur-sayuran">Sayur</option>
            <option value="Buah-buahan">Buah</option>
            <option value="Umbi-umbian">Umbi</option>
            <option value="Rempah-rempah">Rempah</option>
            <option value="Produk Organik">Organik</option>
          </select>
        </div>
        <div className="form-group">
          <label>Harga Produk:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Masukkan harga produk"
            required
          />
        </div>
        <div className="form-group">
          <label>Stok:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            placeholder="Masukkan jumlah stok"
            required
          />
        </div>
        <div className="form-group">
          <label>Deskripsi Produk:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            placeholder="Masukkan deskripsi produk"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Gambar Produk:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required={page !== "edit"}
          />
        </div>
        <div className="form-group">
          <label>Status Produk:</label>
          <select
            name="productStatus"
            value={product.productStatus}
            onChange={handleInputChange}
            className="select-form"
            required
          >
            <option value="" disabled>
              Pilih status
            </option>
            <option value="regular">Reguler</option>
            <option value="presale">Presale</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tanggal Order (kosongkan jika reguler):</label>
          <input
            type="date"
            name="startDate"
            value={product.startDate}
            onChange={handleInputChange}
          />
          {errors.startDate && <p className="error-text">{errors.startDate}</p>}
        </div>
        <div className="form-group">
          <label>Diskon (kosongkan jika reguler):</label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleInputChange}
          />
          {errors.discount && <p className="error-text">{errors.discount}</p>}
        </div>
        <div className="tambah">
          <button type="submit" className="submit-btn1">
            {page === "edit" ? "Update Produk" : "Tambah Produk"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
