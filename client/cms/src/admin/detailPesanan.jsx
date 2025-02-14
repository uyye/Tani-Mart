import React from "react";
import { Package, User, Calendar } from "lucide-react";
import "./detailPesanan.css";
import { Link } from "react-router-dom";
const orderDetail = {
  id: "ORD001",
  customer: "Budi Santoso",
  address: "Jl. Mangga No. 10, Bantaeng",
  products: [
    {
      name: "Cabe Rawit",
      quantity: 3,
      price: "Rp. 105.000",
    },
    {
      name: "Cengkeh Kering",
      quantity: 2,
      price: "Rp. 210.000",
    },
  ],
  total: "Rp 315.000",
  status: "pending",
  date: "2025-03-15",
};

export default function DetailPesanan() {
  return (
    <div className="order-detail-container">
      {/* Header */}
      <div className="header bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800">Detail Pesanan</h1>
        <p className="text-gray-600">ID Pesanan: {orderDetail.id}</p>
      </div>

      {/* Customer Info */}
      <div className="customer-info bg-white shadow-sm rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Informasi Pelanggan
        </h2>
        <div className="info-item">
          <User className="icon" size={20} />
          <p>{orderDetail.customer}</p>
        </div>
        <div className="info-item">
          <Package className="icon" size={20} />
          <p>{orderDetail.address}</p>
        </div>
        <div className="info-item">
          <Calendar className="icon" size={20} />
          <p>{orderDetail.date}</p>
        </div>
      </div>

      {/* Product List */}
      <div className="product-list bg-white shadow-sm rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Daftar Produk
        </h2>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-3 font-medium text-gray-600">Produk</th>
              <th className="pb-3 font-medium text-gray-600">Kuantitas</th>
              <th className="pb-3 font-medium text-gray-600">Harga</th>
            </tr>
          </thead>
          <tbody>
            {orderDetail.products.map((product, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4">{product.name}</td>
                <td className="py-4">{product.quantity}</td>
                <td className="py-4">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Summary */}
      <div className="order-summary bg-white shadow-sm rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Ringkasan Pesanan
        </h2>
        <div className="summary-item">
          <p className="text-gray-600">Total:</p>
          <p className="font-semibold text-gray-800">{orderDetail.total}</p>
        </div>
        <div className="summary-item">
          <p className="text-gray-600">Status:</p>
          <span className={`status-label ${orderDetail.status}`}>
            {orderDetail.status.charAt(0).toUpperCase() +
              orderDetail.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
