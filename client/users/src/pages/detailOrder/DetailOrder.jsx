import { useEffect, useState } from "react";
import "./detailOrder.css";
import instance from "../../api/axiosInstance";
import { useParams } from "react-router-dom";
import Table from "../../components/table/Table";

export default function DetailOrder() {
  const { id } = useParams();
  const [detailOrder, setDetailOrder] = useState(null);

  const fetchDetailOrder = async () => {
    try {
      const { data } = await instance({
        method: "get",
        url: `/orders/${id}`,
        headers: {
          Authorization: `bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setDetailOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetailOrder();
  }, [id]);

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
            </tr>
          </thead>
          <tbody>
            {detailOrder.products?.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>Rp {Number(product.price).toLocaleString()}</td>
                <td>
                  Rp {Number(product.quantity * product.price).toLocaleString()}
                </td>
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
        <p>
          <strong>Ongkos Kirim:</strong> Rp{" "}
          {Number(detailOrder.shippingCost).toLocaleString()}
        </p>
        <p>
          <strong>Total Pembayaran:</strong>{" "}
          <span className="total-price">
            Rp{" "}
            {Number(
              detailOrder.totalPrice + detailOrder.shippingCost
            ).toLocaleString()}
          </span>
        </p>
      </div>

      {/* Tombol Aksi */}
      <div className="order-actions">
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
