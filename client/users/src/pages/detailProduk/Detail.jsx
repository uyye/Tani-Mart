import React, { useEffect, useState } from "react";
import "./Detail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import instance from "../../api/axiosInstance";
import FavoriteButton from "../../components/button/FavoriteButton";
import OrderButton from "../../components/button/orderButton";
import { useDispatch } from "react-redux";
import { PostCart } from "../../features/carts/cartSlice";

export default function DetailProduk() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isPresaleActive, setIsPresaleActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const fetchProduct = async () => {
    try {
      const { data } = await instance.get(`/products/${id}`);
      setProduct(data);

      if (data.productStatus === "presale") {
        const currentDate = new Date();
        const presaleStartDate = new Date(data.Presales[0]?.startDate || "");

        setIsPresaleActive(currentDate >= presaleStartDate);
      } else {
        setIsPresaleActive(true);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleInputCart = () => {
    dispatch(PostCart(id, quantity));
  };

  const handleCheckout = () => {
    const selectedProducts = [{ Product: product, quantity }];
    navigate("/checkout", { state: { selectedProducts } });
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="detail-container">
      {/* Kiri: Gambar Produk */}
      <div className="product-image-section">
        <img
          src={product.image}
          alt={product.name}
          className="product-image1"
        />
      </div>

      {/* Kanan: Informasi Produk */}
      <div className="product-info-section">
        <h1 className="product-title">{product.name}</h1>
        {product.productStatus === "presale" && (
          <p className="presale-info">
            Presale: Siap jual pada{" "}
            {product.Presales[0]?.startDate.split("T")[0]}
          </p>
        )}

        {/* Rating dan Terjual */}
        <div className="product-meta">
          <span className="rating">⭐ {product.rating || "0.0"} / 5.0</span>
          <span className="sold-count">Terjual {product.sold || 0} produk</span>
        </div>

        {/* Harga */}
        <h2 className="product-price">
          Rp {Number(product.price).toLocaleString()} / Kg
        </h2>

        {/* Stok */}
        <p className="product-stock">Stok: {product.stock} Kg</p>

        {/* Deskripsi */}
        <p className="product-description">{product.description}</p>

        {/* Informasi Toko */}
        <div className="seller-info">
          <div className="store-details">
            <p className="store-name">Toko: {product.User?.name}</p>
            <p className="contact-number">
              Kontak: {product.User?.phoneNumber}
            </p>
            <button className="chat-button">Chat Penjual</button>
          </div>
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

        {/* Tombol Order, Keranjang & Wishlist */}
        <div className="order-buttons">
          <OrderButton isPresale={isPresaleActive} handleOrder={handleCheckout}>
            Beli Sekarang
          </OrderButton>
          <button
            className={`add-to-cart-button1 ${
              !isPresaleActive ? "disabled" : ""
            }`}
            onClick={isPresaleActive ? handleInputCart : undefined}
          >
            + Keranjang
          </button>
          <Link to="/wishlist">
            <button className="wishlist-button">❤️ Wishlist</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
