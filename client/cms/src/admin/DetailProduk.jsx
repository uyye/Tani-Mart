// ReactJS Code for Product Detail Page
import React, { useEffect, useState } from "react";
import "./dataDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteProduct, fetchDetailProduct, fetchUpdateProduct } from "../features/products/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../components/deleteButton/DeleteButton";
import UpdateButton from "../components/updateButton/UpdateButton";
import ProductModal from "./ProductModal";
import Swal from "sweetalert2";


const ProductDetail = () => {
const navigate = useNavigate()
const {id} = useParams()
const dispatch = useDispatch()
const product = useSelector((state)=>state.products.product)
const [isModal, setIsmodal]= useState(false)


const handleDeleteProduct =async ()=>{
  const result = await Swal.fire({
        position: "center",
        icon: "warning",
        title: "Serius!",
        text: "Kamu ingin menghapus produk ini?",
        showCancelButton: true,
        confirmButtonText: "Lanjutkan",
        cancelButtonText: "Batal",
      });

      if(result.isConfirmed){
        dispatch(fetchDeleteProduct(id))

        await Swal.fire({
          position: "center",
          icon: "success",
          title: "delete successfully",
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/admin/KelolaProduk")
      }
  
}

const handleUpdateProduct = async (newData)=>{
  console.log(newData, "DATA KIRIMAN");
  dispatch(fetchUpdateProduct(id, newData))
}


useEffect(()=>{
  dispatch(fetchDetailProduct(id))
},[id])

  return (
    <div className="data-detail">
      <h1>Detail Produk</h1>
      <div className="detail-container">
        <div className="detail-item">
          <label>ID Produk:</label>
          <p>{product.id}</p>
        </div>
        <div className="detail-item">
          <label>Status:</label>
          <p>{product.productStatus}</p>
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
        <UpdateButton handleFunction={()=>setIsmodal(true)} />
        </div>
        <ProductModal
          product={product}
          isOpen={isModal}
          onClose={()=>setIsmodal(false)}
          onUpdate={handleUpdateProduct}
        />
      </div>
    </div>
  );
};

export default ProductDetail