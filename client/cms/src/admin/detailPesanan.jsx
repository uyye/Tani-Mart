import React from "react";
import { Package, User, Calendar } from "lucide-react";
import "./detailPesanan.css";
import {useParams} from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrderDetail } from "../features/orders/orderSlice";
import formateDate from "../helpers/formateDate";
import { formatIDR } from "../helpers/formatIDR";
import SideNavbar from "../components/sideNavbar/SideNavbar";


export default function DetailPesanan() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const detailOrder = useSelector((state)=>state.orders.orderDetail)
  

  useEffect(()=>{
    dispatch(fetchAdminOrderDetail(id))
  }, [id, dispatch])
  return (
    <div className="container">
      <SideNavbar/>
      <div className="order-detail-container">
      {/* Header */}
      <div className="header bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800">Detail Pesanan</h1>
        <p className="text-gray-600">ID Pesanan: {detailOrder?.id}</p>
      </div>

      {/* Customer Info */}
      <div className="customer-info bg-white shadow-sm rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Informasi Pelanggan
        </h2>
        <div className="info-item">
          <User className="icon" size={20} />
          <p>{detailOrder?.User?.name}</p>
        </div>
        <div className="info-item">
          <Package className="icon" size={20} />
          <p>{detailOrder?.addressShiping}</p>
        </div>
        <div className="info-item">
          <Calendar className="icon" size={20} />
          <p>{formateDate(detailOrder.createdAt)}</p>
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
            {detailOrder.OrderDetails?.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4">{item.Product.name}</td>
                <td className="py-4">{item.quantity}</td>
                <td className="py-4">{formatIDR(item.price)}</td>
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
          <p className="font-semibold text-gray-800">{formatIDR(detailOrder.totalPrice)}</p>
        </div>
        <div className="summary-item">
          <p className="text-gray-600">Status:</p>
          <span className={`status-label ${detailOrder.status}`}>
            {detailOrder.status}
             
          </span>
        </div>
      </div>
    </div>
    </div>
  );
}
