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

  const [isPresaleActive, setIsPresaleActive] = useState(false);
  const [quantity, setQuantity] = useState(1); 
  const [product, setProduct] = useState({});
  const dispatch = useDispatch()


  console.log(product);
  
  const fetchProduct = async () => {
    try {
      const { data } = await instance({
        method: "get",
        url: `/products/${id}`,
      });
      setProduct(data);

      if(data.productStatus === "presale"){
        const currentDate = new Date();
        const presaleStartDate = new Date(data.Presales[0].startDate);

        setIsPresaleActive(currentDate >= presaleStartDate)
      }else{
        setIsPresaleActive(true)
      }

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
      {product.productStatus === "presale" && 
        <p className="presale">Presale, Siap jual di tanggal: {product.Presales[0].startDate.split("T")[0]}</p>
      }
      <p className="product-price">
        Rp.{Number(product.price).toLocaleString()} / Kg
      </p>
      <p className="product-unit">Stok: {product.stock} Kg</p>
      <p className="product-description">{product.description}</p>
      <FavoriteButton productId={id}/>

      {/* Informasi Penjual */}
      <div className="seller-info">
        <p className="store-name">Toko: {product.User?.name}</p>
        <p className="contact-number">Kontak: {product.User?.phoneNumber}</p>
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
      <OrderButton isPresale={isPresaleActive} handleOrder={handleCheckout}>Beli sekarang</OrderButton>
      <Link onClick={isPresaleActive?handleInputCart:undefined}
        className={`contact-button2 ${!isPresaleActive?"disabled":""}`}
      >
        Masukkan Keranjang
      </Link>
    </div>
  );
}
