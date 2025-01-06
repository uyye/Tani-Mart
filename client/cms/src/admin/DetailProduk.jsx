// ReactJS Code for Product Detail Page
import React, { useEffect } from "react";
import "./DetailProduk.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteProduct, fetchDetailProduct } from "../features/products/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../components/deleteButton/DeleteButton";
import UpdateButton from "../components/updateButton/UpdateButton";

const ProductDetail = () => {
const navigate = useNavigate()
const {id} = useParams()
const dispatch = useDispatch()
const product = useSelector((state)=>state.products.product)

const handleDeleteProduct = ()=>{
  dispatch(fetchDeleteProduct(id))
  navigate("/KelolaProduk")
}


useEffect(()=>{
  dispatch(fetchDetailProduct(id))
},[])

  return (
    <div className="product-detail">
      <h1>Detail Produk</h1>
      <div className="detail-container">
        <div className="detail-item">
          <label>ID Produk:</label>
          <p>{product.id}</p>
        </div>
        <div className="detail-item">
          <label>Nama:</label>
          <p>{product.name}</p>
        </div>
        <div className="detail-item">
          <label>Kategori:</label>
          <p>{product.category}</p>
        </div>
        <div className="detail-item">
          <label>Harga:</label>
          <p>{product.price}</p>
        </div>
        <div className="detail-item">
          <label>Stok:</label>
          <p>{product.stock}</p>
        </div>
        <div className="detail-item">
          <label>Deskripsi:</label>
          <p>{product.description}</p>
        </div>
        <div className="control-button">
        <DeleteButton handleFunction={handleDeleteProduct}/>
        <UpdateButton/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail