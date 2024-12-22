import React, { useState } from "react";
import "./checkout.css";
import instance from "../../api/axiosInstance";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const location = useLocation()
  const selectedProducts = location.state?.selectedProducts
  const totalPrice = selectedProducts.reduce((acc, product)=> acc + product.Product.price * product.quantity, 0)  


  const handleNotificationPayment = async(order_id, transaction_status)=>{
    try {
      await instance({
        method:"post",
        url:"/payments/webhooks",
        data:{order_id, transaction_status}
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleOrder = async()=>{
    const formattedProduct = selectedProducts.map(product =>({
      id:product.Product.id,
      quantity:product.quantity
    }))

    try {
      const order = await instance({
        method:"post",
        url:"/orders",
        data:{
          addressShiping:address,
          phoneNumber:phoneNumber,
          products:formattedProduct
        },
        headers:{
          "Authorization":`bearer ${localStorage.getItem("access_token")}`
        }
      })
      
      const payment = await instance({
        method:"post",
        url:"/payments",
        data:{orderId:order.data.newOrder.id},
        headers:{
          "Authorization":`bearer ${localStorage.getItem("access_token")}`
        }
      })

      const token = payment.data?.token
      console.log(token, "TOKEN DARI PAYMENT");
      
      

      window.snap.pay(token.token, {
        onSuccess: async (result) => {
          alert("Payment Success!");
          console.log(result);
          await handleNotificationPayment(Number(result.order_id.split("-")[1]), result.transaction_status)
        },
        onPending: async (result) => {
          alert("Waiting for your payment!");
          console.log(result);
          await handleNotificationPayment(Number(result.order_id.split("-")[1]), result.transaction_status)

        },
        onError: async(result) => {
          alert("Payment Failed!");
          await handleNotificationPayment(Number(result.order_id.split("-")[1]), result.transaction_status)
        },
        onClose: () => {
          alert("You closed the popup without finishing the payment");
        },
      });
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Alamat Pengiriman */}
      <div className="section">
        <h2>Alamat Pengiriman</h2>
        <textarea
          className="address-input"
          placeholder="Masukkan alamat pengiriman lengkap"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
      </div>
      <div className="section">
        <h2>Nomor Handphone</h2>
        <input
          className="address-input"
          type="phone"
          value={phoneNumber}
          placeholder="Masukkan nomor hp yang dapat dihubungi"
          onChange={(e)=> setPhoneNumber(e.target.value)}
        ></input>
      </div>

      {/* Detail Produk */}
      <div className="section">
        <h2>Detail Produk</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Quantity</th>
              <th>Harga Satuan</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {
              selectedProducts.map((x,y)=>{
                return(
                  <tr key={y}>
                    <td>{x.Product.name}</td>
                    <td>{x.quantity}</td>
                    <td>Rp {(x.Product.price).toLocaleString()}</td>
                    <td>Rp {(x.Product.price * x.quantity).toLocaleString()}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <p className="total">Total: Rp {totalPrice.toLocaleString()}</p>
      </div>
      {/* Konfirmasi dan Submit */}
      <div className="section">
        <button className="checkout-button" onClick={handleOrder}>Lakukan Pembayaran</button>
      </div>
    </div>
  );
};

export default Checkout;
