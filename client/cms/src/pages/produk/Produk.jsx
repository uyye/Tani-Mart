import React, { useEffect, useState } from "react";
import "./Produk.css"; // Import file CSS terpisah
import instance from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async()=>{
    try {
      const {data} = await instance({
        method:"get",
        url:"/products/admin",
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("access_token")}`
        }
      })
      setProducts(data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteProduct = async(id)=>{
    const result =  await Swal.fire({
      position:"center",
      icon:"warning",
      title:"Serius!",
      text:"Kamu ingin menghapus produk ini?",
      showCancelButton:true,
      confirmButtonText:"Lanjutkan",
      cancelButtonText:"Batal"
    })
    if(result.isConfirmed){
      try {
        await instance({
          method:"delete",
          url:`/products/${id}`,
          headers:{
            "Authorization":`bearer ${localStorage.getItem("access_token")}`
          }
        })
        Swal.fire({
          position:"center",
          icon:"success",
          title:"delete successfully",
          showConfirmButton:false,
          timer:2000
      })
      fetchProduct()
      } catch (error) {
        Swal.fire({
          position:"center",
          icon:"info",
          title:"Gagal!",
          text:"Gagal Menghapus Produk",
          showConfirmButton:false,
          timer:2000
      })
        console.log(error);
      }
    }
    
  }

  useEffect(()=>{
    fetchProduct()
  }, [])

  return (
    <div className="table-container">
      <h1>Daftar Produk</h1>
      {/* Tabel Produk */}
      <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </td>
                <td>{product.name}</td>
                <td>Rp {product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="btn-update"><Link to={`/Input/${product.id}`}>Update</Link></button>
                  <button className="btn-delete" onClick={()=>handleDeleteProduct(product.id)}> Hapus</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                Tidak ada produk
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
