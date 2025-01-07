// ReactJS Code
import React, { useEffect, useState } from "react";
import "./dataManage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataProduct } from "../features/products/productSlice";
import DetailButton from "../components/detailButton/DetailButton";
import {Link} from "react-router-dom"

const ManageProducts = () => {
  const dispatch = useDispatch()
  const products = useSelector((state)=>state.products.products)
  console.log(products);
  

  useEffect(()=>{
    dispatch(fetchDataProduct())
  },[])
  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     nama: "Tomat",
  //     kategori: "Buah",
  //     harga: 20000,
  //     stok: 50,
  //     deskripsi: "dsmvfsokffdnjgfdvfdvnfdvfdjvfdvsfv",
  //     gambar: "gambar",
  //     status: "Reguler",
  //     tanggalOrder: "-",
  //     diskon: "-",
  //   },
  //   {
  //     id: 2,
  //     nama: "Sawi",
  //     kategori: "Sayur",
  //     harga: 3000,
  //     stok: 420,
  //     deskripsi: "dsmvfsokffdnjgfdvfdvnfdvfdjvfdvsfv",
  //     gambar: "gambar",
  //     status: "Presale",
  //     tanggalOrder: "23/04/2025",
  //     diskon: "10%",
  //   },
  // ]);

  // const handleUpdateProduct = (id) => {
  //   console.log(`Update product with ID: ${id}`);
  //   // Add update logic here
  // };

  // const handleDeleteProduct = (id) => {
  //   setProducts(products.filter((product) => product.id !== id));
  //   console.log(`Delete product with ID: ${id}`);
  // };

  return (
    <div className="manage-table">
      <h1>Kelola Produk</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Produk</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>Rp {product.price.toLocaleString()}</td>
              <td>{product.stock}</td>
              <td>{product.productStatus}</td>
              <td>
                <Link to={`/admin/DetailProduk/${product.id}`}><DetailButton/></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
