import { useEffect, useState } from "react";
import "./detailOrder.css";
import instance from "../../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPaidOrder } from "../../features/orders/orderSlice";

export default function DetailOrder() {
  const { id } = useParams();
  const [detailOrder, setDetailOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  const fetchDetailOrder = async () => {
    try {
      const { data } = await instance({
        method: "get",
        url: `/orders/${id}`,
        headers: {
          Authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });

      console.log(data); // Periksa data yang diterima
      setDetailOrder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading ke false setelah selesai
    }
  };

  const handlePayment = (e)=>{
    e.preventDefault()
    dispatch(fetchPaidOrder(id))
    dispatch(fetchDetailOrder(id))
  }

  useEffect(() => {
    fetchDetailOrder();
  }, [id]);

  if (loading) {
    return <p>Memuat data pesanan...</p>;
  }

  if (!detailOrder) {
    return <p>Anda belum melakukan pemesanan.</p>;
  }

  return (
    <div className="detailOrder-container">
      <h1>Detail Pesanan</h1>

      {/* Informasi Pengiriman */}
      <div className="shipping-info">
        <h2>Informasi Pengiriman</h2>
        <p>
          <strong>Nama Penerima:</strong> {detailOrder.User?.name}
        </p>
        <p>
          <strong>Alamat:</strong> {detailOrder.addressShiping}
        </p>
        <p>
          <strong>Nomor Telepon:</strong> {detailOrder.phoneNumber}
        </p>
        <p className={`status ${detailOrder.status.toLowerCase()}`}>
          <strong>Status:</strong> {detailOrder.status}
        </p>
      </div>

      {/* Tabel Produk */}
      <div className="order-products">
        <h2>Produk dalam Pesanan</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Nama Produk</th>
              <th>Jumlah</th>
              <th>Harga</th>
              <th>Subtotal</th>
              <th>Toko</th>
            </tr>
          </thead>
          <tbody>
            {detailOrder.OrderDetails?.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.Product.image}
                    alt={item.Product.name}
                    className="product-image"
                  />
                </td>
                <td>{item.Product.name}</td>
                <td>{item.quantity}</td>
                <td>Rp {Number(item.price).toLocaleString()}</td>
                <td>
                  Rp {Number(item.quantity * item.price).toLocaleString()}
                </td>
                <td>{item.Product.User.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ringkasan Pembayaran */}
      <div className="order-summary">
        <h2>Ringkasan Pembayaran</h2>
        <p>
          <strong>Total Harga:</strong> Rp{" "}
          {Number(detailOrder.totalPrice).toLocaleString()}
        </p>
      </div>

      {/* Tombol Aksi */}
      <div className="order-actions">
        {detailOrder.status.toLowerCase() === "pending" && (
          <button className="order-button complete-payment" onClick={handlePayment}>
            Selesaikan Pembayaran
          </button>
        )}
        {detailOrder.status === "Dikirim" && (
          <button className="order-button track">Lacak Pesanan</button>
        )}
        {detailOrder.status === "Selesai" && (
          <button className="order-button confirm">Konfirmasi Terima</button>
        )}
      </div>
    </div>
  );
}
