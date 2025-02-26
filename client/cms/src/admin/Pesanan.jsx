import React, { useEffect, useState } from "react";
import {Package} from "lucide-react";
import { Link } from "react-router-dom";
import "./Pesanan.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderAdmin } from "../features/orders/orderSlice";
import formateDate from "../../../users/src/helpers/formateDate";
import { formatIDR } from "../helpers/formatIDR";
import SideNavbar from "../components/sideNavbar/SideNavbar";


export default function Pesanan() {
  const dispatch = useDispatch()
  const orders = useSelector((state)=>state.orders.orders)
  const [editOrder, setEditOrder] = useState(null);


  const handleSave = () => {
    // Simpan perubahan pesanan di sini (misalnya, update state atau kirim ke server)
    setEditOrder(null);
  };

  const handleCancel = () => {
    setEditOrder(null);
  };

  useEffect(()=>{
    dispatch(fetchOrderAdmin())
  }, [dispatch])
  
  return (
    <div className="container">
      {/* Sidebar */}
      <SideNavbar/>

      <div className="space-y-6">
        {/* Orders Table */}
        {editOrder ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Pesanan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">
                  ID Pesanan
                </label>
                <input
                  type="text"
                  value={editOrder.id}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Pelanggan</label>
                <input
                  type="text"
                  value={editOrder.customer}
                  onChange={(e) =>
                    setEditOrder({ ...editOrder, customer: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Status</label>
                <select
                  value={editOrder.status}
                  onChange={(e) =>
                    setEditOrder({ ...editOrder, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Daftar Pesanan
                </h2>
                <div className="flex gap-2">
                  <select className="border rounded-lg px-3 py-2">
                    <option>Semua Status</option>
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-center border-b border-gray-200">
                      <th className="pb-3 font-medium text-gray-600">
                        ID Pesanan
                      </th>
                      <th className="pb-3 font-medium text-gray-600">
                        Pelanggan
                      </th>
                      <th className="pb-3 font-medium text-gray-600">Produk</th>
                      <th className="pb-3 font-medium text-gray-600">Total</th>
                      <th className="pb-3 font-medium text-gray-600">Status</th>
                      <th className="pb-3 font-medium text-gray-600">
                        Tanggal
                      </th>
                      <th className="pb-3 font-medium text-gray-600">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100">
                        <td className="py-4">{order.id}</td>
                        <td className="py-4">{order.User.name}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <Package size={16} />
                            <span>{order.totalItem} items</span>
                          </div>
                        </td>
                        <td className="py-4">{formatIDR(order.totalPrice)}</td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "paid"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4">{formateDate(order.createdAt)}</td>
                        <td className="py-4">
                          <button>
                            <Link
                              to={`/admin/DetailPesanan/${order.id}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Detail
                            </Link>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
