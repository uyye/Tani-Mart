import { useEffect } from "react";
import "./Wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  fetchRemoveFavorite,
} from "../../features/favorites/favoriteSlice";
import { Link } from "react-router-dom";
import { PostCart } from "../../features/carts/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dataFavorites.favorites);

  console.log(data, "><>>>>>");
  

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(fetchRemoveFavorite(id));
  };

  const handleAddToCart = (id) => {
    dispatch(PostCart(id, 1))
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Wishlist Saya</h1>

      {data?.length > 0 ? (
        <div className="wishlist-grid">
          {data.map((item) => (
            <div className="wishlist-card" key={item.Product.id}>
              <img
                src={item.Product.image}
                alt={item.Product.name}
                className="wishlist-image"
              />
              <div className="wishlist-info">
                <h3 className="product-name">{item.Product.name}</h3>
                <p className="product-price">
                  Rp {Number(item.Product.price).toLocaleString()}
                </p>
                <p
                  className={`stock-status ${
                    item.Product.stock > 0 ? "available" : "unavailable"
                  }`}
                >
                  {item.Product.stock > 0 ? "Stok Tersedia" : "Stok Habis"}
                </p>
                <div className="wishlist-buttons">
                  <button className="detail-btn">
                    <Link to={`/detail/${item.Product.id}`}>Lihat Detail</Link>
                  </button>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item.Product.id)}
                    disabled={item.Product.stock === 0}
                  >
                    Tambah ke Keranjang
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleDelete(item.Product.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">Tidak ada produk di wishlist</p>
      )}
    </div>
  );
};

export default Wishlist;
