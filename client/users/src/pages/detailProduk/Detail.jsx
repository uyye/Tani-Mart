import React, { useEffect, useState } from "react";
import "./Detail.css";
import { Link, replace, useNavigate, useParams } from "react-router-dom";
import instance from "../../api/axiosInstance";
import FavoriteButton from "../../components/button/FavoriteButton";
import OrderButton from "../../components/button/orderButton";
import {useDispatch} from "react-redux"
import { PostCart } from "../../features/carts/cartSlice";

export default function DetailProduk() {
  const navigate = useNavigate()
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1); 
  const [product, setProduct] = useState({});
  const dispatch = useDispatch()

  const fetchProduct = async () => {
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

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1); 
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); 
    }
  };

  const handleInputCart = async () => {
    dispatch(PostCart(id, quantity ))
  };

  const handleCheckout = ()=>{
    const selectedProducts = [{ Product: product, quantity: quantity }]

    console.log(selectedProducts, "Data yang dikirimkan ke checkout");
    
    navigate("/checkout", { state: {selectedProducts}});
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="detail-product-container">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">
        Rp.{Number(product.price).toLocaleString()} / Kg
      </p>
      <p className="product-unit">Stok: {product.stock} Kg</p>
      <p className="product-description">{product.description}</p>
      <FavoriteButton productId={id}/>

      {/* Informasi Penjual */}
      <div className="seller-info">
        <p className="store-name">Toko: {product.storeName}</p>
        <p className="contact-number">Kontak: {product.contact}</p>
      </div>

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
      <OrderButton handleOrder={handleCheckout}>Beli sekarang</OrderButton>
      <Link onClick={handleInputCart} className="contact-button2">
        Masukkan Keranjang
      </Link>
    </div>
  );
}
