import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./KelolaProduk.css";
import { Plus, Eye } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDataProduct } from "../features/products/productSlice";
import SideNavbar from "../components/sideNavbar/SideNavbar";
import AddProduct from "../pages/inputProduk/InputProduk";


export default function KelolaProduk() {

  const dispatch = useDispatch()
  const products = useSelector((state)=>state.products.products)
  const [isModal, setIsmodal] = useState(false)

  useEffect(()=>{
    dispatch(fetchDataProduct())
  }, [dispatch])
  return (
    <div className="container">
      {/* Sidebar */}
      <SideNavbar/>

      <div className="kelola-produk-container">
        <div className="header">
          <h2>Kelola Produk</h2>
        </div>
        
          <button className="add-product-btn" onClick={()=>setIsmodal(true)}>
            <Plus size={16} /> Tambah Produk
          </button>
        
        <table className="produk-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Status</th>
              <th>Total Komisi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`status ${product.productStatus}`}>
                    {product.productStatus}
                  </span>
                </td>
                <td>{product.commissionRate + " %"}</td>
                <td>
                  <Link to={`/admin/DetailProduk/${product.id}`}>
                    <button className="detail-btn">
                      <Eye size={16} /> Detail
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        isModal &&
        <AddProduct setModal={()=>setIsmodal(false)}/>
      }
    </div>
  );
}
