import React, { useEffect, useState } from "react";
import "./InputProduk.css";
import instance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function AddProduct({page}) {

  const {id} = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem("access_token")

  const [product, setProduct] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(page === "add"){
      try {
        const {data} = await instance({
          method:"post",
          url:"/products/",
          data: product,
          headers:{
            "Authorization":`bearer ${token}`,
            "Content-Type":"application/json"
          }
        })
  
        await Swal.fire({
          title: data.message,
          icon:"success",
          showConfirmButton:false,
          timer:2000
        })
        navigate("/product")
      } catch (error) {
        console.log(error);
      }
    }else if(page === "edit"){
      try {
        await instance({
          method:"put",
          url:`/products/${id}`,
          data:product,
          headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          }
        })
        navigate("/product")
      } catch (error) {
        console.log(error);
        
      }
    }
  };

  const fetchProductById = async ()=>{
    try {
      const {data} = await instance({
        method:"get",
        url:`/products/${id}`
      })
      setProduct(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(id){
      fetchProductById()
    }
  }, [id])

  return (
    <div className="add-product-container">
      {page === "edit"?<h1>Edit Produk</h1>:<h1>Tambah Produk</h1>}
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
            type="text"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          {
            page === "edit"?
            <p>Update</p>:
            <p>Tambah Produk</p>
          }
        </button>
      </form>
    </div>
  );
}
