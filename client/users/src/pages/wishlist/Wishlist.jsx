import { useEffect } from "react";
import "./Wishlist.css";
import {useDispatch, useSelector} from "react-redux"
import { fetchFavorites } from "../../features/favorites/favoriteSlice";
import DeleteButton from "../../components/button/DeleteButton";
import DetailButton from "../../components/button/DetailButton";

const Wishlist = () => {
  const dispatch = useDispatch()
  const data = useSelector((state)=>state.dataFavorites.favorites)
  
  const handleDelete = (id) => {
    console.log(`Hapus produk dengan ID: ${id}`);
  };

  const handleAddToCart = (id) => {
    console.log(`Tambah produk dengan ID: ${id} ke keranjang`);
  };

  useEffect(()=>{
    dispatch(fetchFavorites())
  },[])

  return (
    <header className="app">
      <h1>Wishlist</h1>
      <div className="wishlist-container">
        {data?.map((item) => (
          <div className="wishlist-card" key={item.Product.id}>
            <div className="wishlist-content">
              <h3 className="product-name">{item.Product.name}</h3>
              <p className="product-price">
                Harga: Rp {item.Product.price.toLocaleString()}
              </p>
              <p className="product-stock">Stok: {item.Product.stock}</p>
              <p
                className={`stock-status ${
                  item.Product.stock > 0 ? "available" : "unavailable"
                }`}
              >
                {item.Product.productStatus}
              </p>
              <DeleteButton/>
              <DetailButton/>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(item.id)}
              disabled={item.stock === 0}
            >
              Add to Keranjang
            </button>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Wishlist;
