import React, { useEffect, useState } from "react";
import "./Detail.css";
import gambar from "../../assets/wortel.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../../api/axiosInstance";
import Swal from "sweetalert2";

export default function DetailProduk() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [quantity, setQuantity] = useState(1); // State untuk kuantitas
  const [product, setProduct] = useState({});
  

  const fetchProduct = async()=>{
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

  const handleIncrease = () => {
    if(quantity < product.stock)
    setQuantity(quantity + 1); // Tambah kuantitas
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Kurangi kuantitas, minimal 1
    }
  };

  const handleInputCart = async ()=>{
    try {
     const {data}= await instance({
        method:"post",
        url:`/carts`,
        data:{
          productId:id,
          quantity:quantity
        },
        headers:{
          "Authorization":`bearer ${localStorage.getItem("access_token")}`
        }
      })

      Swal.fire({
        icon:"success",
        showConfirmButton:false,
        title:"Success",
        text:`${product.name} berhasil ditambahkan ke keranjang`,
        timer:2000
      })
    } catch (error) {
      if(error.status === 401){
        const result = await Swal.fire({
          icon:"question",
          title:"Belum Login?",
          text:"Silahkan login untuk lakukan pemesanan",
          showCancelButton:true,
          confirmButtonText:"Login",
          cancelButtonText:"Batal"
        })

        if(result.isConfirmed){
          navigate("/login")
        }
      }
    }
  }

  

  useEffect(()=>{
    fetchProduct()
  }, [id])

  return (
    <div className="detail-product-container">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">Rp.{Number(product.price).toLocaleString()} / Kg</p>
      <p className="product-unit">{product.stock} Kg</p>
      <p className="product-description">{product.description}</p>

      {/* Tombol Kuantitas */}
      <div className="quantity-container">
        <button onClick={handleDecrease} className="quantity-button">
          -
        </button>
        <span className="quantity-display">{quantity}</span>
        <button onClick={handleIncrease} className="quantity-button">
          +
        </button>
      </div>

      <Link to="/checkout" className="contact-button2">
        Beli Sekarang
      </Link>
      <Link onClick={handleInputCart} className="contact-button2">
        Masukkan Keranjang
      </Link>
    </div>
  );
}
