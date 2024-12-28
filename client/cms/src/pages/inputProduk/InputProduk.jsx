import React, { useEffect, useState } from "react";
import "./InputProduk.css";
import instance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function AddProduct({ page }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [product, setProduct] = useState({
    name: "",
    category:"",
    description: "",
    price: "",
    stock: "",
    productStatus:"",
    discount:"",
    startDate:""
  });

  const [image, setImage] = useState(null)

  const handleImageChange = (e)=>{
    setImage(e.target.files[0])
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("name", product.name)
    formData.append("category", product.category)
    formData.append("description", product.description)
    formData.append("price", product.price)
    formData.append("stock", product.stock)
    formData.append("productStatus", product.productStatus)
    formData.append("discount", product.discount)
    formData.append("startDate", product.startDate)
    if (image) {
      formData.append("file", image);
    }

    let method = "post"
    let url = "/products/"
    console.log("Masuk submit");
    

    if(page === "edit"){
      method = "put"
      url = `/products/${id}`
    }

      try {
        const { data } = await instance({
          method,
          url,
          data: formData,
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type":"multipart/form-data",
          },
        });

        await Swal.fire({
          title: "Succes",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/product");

      } catch (error) {
        console.log(error);
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
    <div className="add-product-container">
      {page === "edit" ? <h1>Edit Produk</h1> : <h1>Tambah Produk</h1>}
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label>Nama Produk:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Kategory:</label>
          <select name="category" value={product.category} className="select-form" onChange={handleInputChange}>
            <option value="" disabled></option>
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
            required
          />
        </div>
        <div className="form-group">
          <label>Deskripsi Produk:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Status product</label>
        <select name="productStatus" value={product.productStatus} className="select-form" onChange={handleInputChange} required>
            <option value="" disabled></option>
            <option value="regular">Reguler</option>
            <option value="presale">Presale</option>
          </select>
        </div>
        <div className="form-group">
          <label> Tanggal Order (kosongkan jika reguler):</label>
          <input
            type="date"
            name="startDate"
            value={product.orderDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Diskon (kosongkan jika reguler):</label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          {page === "edit" ? <p>Update</p> : <p>Tambah Produk</p>}
        </button>
      </form>
    </div>
  );
}
