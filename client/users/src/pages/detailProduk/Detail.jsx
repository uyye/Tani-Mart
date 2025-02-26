import React, { useEffect, useState } from "react";
import "./Detail.css";
import { useNavigate, useParams } from "react-router-dom";
import OrderButton from "../../components/button/orderButton";
import { useDispatch, useSelector } from "react-redux";
import { PostCart } from "../../features/carts/cartSlice";
import { fetchDetailProduct } from "../../features/products/productSlice";
import Swal from "sweetalert2";
import {
  fetchCreateFavorite,
  fetchFavoriteByProduct,
  fetchRemoveFavorite,
} from "../../features/favorites/favoriteSlice";
import formateDate from "../../helpers/formateDate";

export default function DetailProduk() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const product = useSelector((state) => state.dataProducts.product);
  const favorite = useSelector((state) => state.dataFavorites.favorite);
  console.log(product, "CEK DATA");
  

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleInputCart = async () => {
    if (!localStorage.getItem("access_token")) {
      const result = await Swal.fire({
        icon: "question",
        title: "Belum login?",
        text: "Silahkan login untuk lakukan pemesanan",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        navigate("/login");
      }
    } else {
      dispatch(PostCart(id, quantity));
    }
  };

  const handleCheckout = async () => {
    if (!localStorage.getItem("access_token")) {
      const result = await Swal.fire({
        icon: "question",
        title: "Belum login?",
        text: "Silahkan login untuk lakukan pemesanan",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        navigate("/login");
      }
    } else {
      const selectedProducts = [{ Product: product, quantity }];
      navigate("/checkout", { state: { selectedProducts } });
    }
  };

  const handleProductFavorite = async () => {
    dispatch(fetchCreateFavorite(id));
    await Swal.fire({
      icon: "success",
      text: "Berhasil menambahkan produk ke daftar whislist",
    });
  };

  const handleDeleteFavorite = () => {
    dispatch(fetchRemoveFavorite(id));
  };

  useEffect(() => {
    dispatch(fetchDetailProduct(id));
    dispatch(fetchFavoriteByProduct(id));
  }, [id, dispatch]);

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
            [ Pre-Order Delivery {formateDate(product.Presales[0]?.endDate)} ]
          </p>
        )}

        {/* Rating dan Terjual */}
        <div className="product-meta">
          {/* <span className="rating">⭐ {product.rating || "0.0"} / 5.0</span>
          <span className="sold-count">Terjual {product.sold || 0} produk</span> */}
        <span>
          Discount:{product.Presales?.length > 0?
          product.Presales[0].discount + `%`:
          "0 %"}
        </span>
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
          <OrderButton handleOrder={handleCheckout}>Beli Sekarang</OrderButton>
          {
            product.productStatus === "regular" &&
            <button className={`add-to-cart-button1`} onClick={handleInputCart}>
              + Keranjang
            </button>

          } 
          <button
            className={`wishlist-button ${
              Object.keys(favorite).length !== 0 ? "active" : ""
            }`}
            onClick={
              Object.keys(favorite).length === 0
                ? handleProductFavorite
                : handleDeleteFavorite
            }
          >
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
