import React, { useState } from "react";
import "./keranjang.css";
import useCart from "../../hooks/useCart";
import instance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";


export default function Keranjang() {
  const navigate = useNavigate()
  const {cart, loading, error} = useCart()
  const [selectedItems, setSelectedItems] = useState([]);


  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>{
      return prevSelected.includes(id)
      ?prevSelected.filter((itemId) => itemId !== id)
      :[...prevSelected, id]
    }
  );
};
  
  const calculateTotal = () => {
    if (!cart.CartItems || !selectedItems.length) return 0;
    return cart.CartItems.filter((item) => selectedItems.includes(item.id))
      .reduce((acc, item) => acc + item.quantity * item.Product.price, 0);
  };

  const handleOrder = async()=>{

    const selectedProducts = cart.CartItems?.filter((item)=>selectedItems.includes(item.id))

    if(!selectedProducts?.length){
      alert("productmu mana manis")
      return;
    }

      navigate(`/checkout`, {state:{selectedProducts}})

   
    // try {
    //   const {data} = await instance({
    //     method:"post",
    //     url:"/orders",
    //     data:{products:selectedProducts},
    //     headers:{
    //       "Authorization":`bearer ${localStorage.getItem("access_token")}`
    //     }
    //   })      

    //   navigate(`/pesananSaya`)
    // } catch (error) {
    //   console.log(error);
    // }
  }


  return (
    <div className="cart">
      <h1>Keranjang Belanja</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Produk</th>
            <th>Jumlah</th>
            <th>Harga Satuan</th>
            <th>Subtotal</th>
            <th>Pilih</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.CartItems?.length > 0 ?
            cart.CartItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.Product.name}</td>
                <td>{item.quantity}</td>
                <td>Rp {Number(item.Product.price).toLocaleString()}</td>
                <td>Rp {(item.quantity * item.Product?.price).toLocaleString()} </td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td>
                  <button className="btn-delete">
                    Hapus
                  </button>
                </td>
              </tr>
            )):
            ""
          }
        </tbody>
      </table>
      <div className="cart-footer">
        <button className="btn-submit" onClick={handleOrder}>
          Checkout Total: Rp {Number(calculateTotal()).toLocaleString()}
        </button>
      </div>
    </div>
  );
}
