import React, { useEffect, useState } from "react";
import "./keranjang.css";
import { useNavigate } from "react-router-dom";
import TableCart from "../../components/table/TableCart";
import {useDispatch, useSelector} from "react-redux"
import { fetchCart, fetchRemoveCart } from "../../features/carts/cartSlice";


export default function Keranjang() {
  const navigate = useNavigate()

  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch()
  const data = useSelector((state)=>state.dataCart.carts)

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>{
      return prevSelected.includes(id)
      ?prevSelected.filter((itemId) => itemId !== id)
      :[...prevSelected, id]
    }
  );
};
  
  const calculateTotal = () => {
    if (!data.CartItems || !selectedItems.length) return 0;
    return data.CartItems.filter((item) => selectedItems.includes(item.id))
      .reduce((acc, item) => acc + item.quantity * item.Product.price, 0);
  };

  const handleOrder = async()=>{

    const selectedProducts = data.CartItems?.filter((item)=>selectedItems.includes(item.id))
    console.log(selectedProducts, "INI DICARI");
    
    if(!selectedProducts?.length){
      alert("productmu mana manis")
      return;
    }

      navigate(`/checkout`, {state:{selectedProducts}})

  }

  

  useEffect(()=>{
    dispatch(fetchCart())
  },[dispatch])

  return (
    <div className="cart">
      <h1>Keranjang Belanja</h1>
      <div style={{margin :"40px"}}>
       <TableCart cart={data} selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange}/>  
      </div>
      <div className="cart-footer">
        <button className="btn-submit" onClick={handleOrder}>
          Checkout Total: Rp {Number(calculateTotal()).toLocaleString()}
        </button>
      </div>
    </div>
  );
}
