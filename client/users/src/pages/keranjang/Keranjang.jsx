import React, { useEffect, useState, useMemo } from "react";
import "./keranjang.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, fetchRemoveCart } from "../../features/carts/cartSlice";

export default function Keranjang() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dataCart.carts);

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === data?.CartItems?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data?.CartItems?.map((item) => item.id) || []);
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(fetchRemoveCart(id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  const handleWishlist = () => {
    navigate("/wishlist");
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const calculateTotal = useMemo(() => {
    if (!data?.CartItems || !selectedItems.length) return 0;
    return data.CartItems.filter((item) =>
      selectedItems.includes(item.id)
    ).reduce((acc, item) => acc + item.quantity * item.Product.price, 0);
  }, [data, selectedItems]);

  const handleOrder = () => {
    const selectedProducts = data?.CartItems?.filter((item) =>
      selectedItems.includes(item.id)
    );

    if (!selectedProducts?.length) {
      alert("Tidak ada produk yang dipilih!");
      return;
    }

    navigate(`/checkout`, { state: { selectedProducts } });
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Keranjang Belanja</h1>

      <div className="cart-header">
        <div className="select-all">
          <input
            type="checkbox"
            checked={selectedItems.length === data?.CartItems?.length}
            onChange={handleSelectAll}
          />
          <span>Pilih Semua</span>
        </div>
        <button className="wishlist-btn" onClick={handleWishlist}>
          ❤️ Pindahkan ke Wishlist
        </button>
      </div>

      <div className="cart-items">
        {data?.CartItems?.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-checkbox">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
            </div>
            <img
              src={item.Product?.image}
              alt={item.Product?.name}
              className="item-image"
            />
            <div className="item-details">
              <h2 className="item-name">{item.Product?.name}</h2>
              <p className="item-price">
                Rp {Number(item.Product?.price).toLocaleString()}
              </p>
              <p className="item-quantity">Jumlah: {item.quantity}</p>
              <div className="item-actions">
                <button
                  className="detail-btn"
                  onClick={() => handleDetail(item.Product?.id)}
                >
                  Lihat Detail
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="total-price">
          <span>Total Harga:</span>
          <span className="total-amount">
            Rp {Number(calculateTotal).toLocaleString()}
          </span>
        </div>
        <button className="btn-checkout" onClick={handleOrder}>
          Checkout ({selectedItems.length})
        </button>
      </div>
    </div>
  );
}
