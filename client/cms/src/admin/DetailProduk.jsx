import { useParams } from "react-router-dom";
import "./DetailProduk.css";
import SideNavbar from "../components/sideNavbar/SideNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDetailProduct } from "../features/products/productSlice";
import { formatIDR } from "../helpers/formatIDR";

const productData = {
  id: "P001",
  name: "Cabe Rawit",
  category: "Sayur-Sayuran",
  price: 30000,
  stock: 500,
  status: "Reguler",
  description:
    "Cabe rawit dengan tingkat kepedasan yang extra dan berkualitas tinggi.",
  store: "Syarifuddin",
  storeNumber: "0812-3456-7890",
  image: "https://via.placeholder.com/150", // Gambar produk sementara
};

export default function DetailProduk() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const detailProduct = useSelector((state)=>state.products.product)
  console.log(detailProduct);
  

  const handleUpdate = () => {
    alert("Fitur update belum diimplementasikan.");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus produk ini?"
    );
    if (confirmDelete) {
      alert("Produk berhasil dihapus.");
    }
  };

  useEffect(()=>{
    dispatch(fetchDetailProduct(id))
  },[id, dispatch])

  return (
    <div className="container">
      <SideNavbar/>
      <div className="detail-produk-container">
      <h2>Detail Produk</h2>

      <div className="produk-detail-card">
        <img
          src={detailProduct.image}
          alt={detailProduct.name}
          className="produk-image"
        />
        <div className="produk-info">
          <p>
            <strong>ID Produk:</strong> {detailProduct.id}
          </p>
          <p>
            <strong>Nama Produk:</strong> {detailProduct.name}
          </p>
          <p>
            <strong>Kategori:</strong> {detailProduct.category}
          </p>
          <p>
            <strong>Harga Satuan:</strong>
            {formatIDR(detailProduct.price)}
          </p>
          <p>
            <strong>Stok:</strong> {detailProduct.stock}
          </p>
          <p>
            <strong>Status:</strong> {detailProduct.productStatus}
          </p>
          <p>
            <strong>Deskripsi:</strong> {detailProduct.description}
          </p>
          <p>
            <strong>Nama Toko:</strong> {detailProduct.User?.name}
          </p>
          <p>
            <strong>Nomor Toko:</strong> {detailProduct.User?.phoneNumber}
          </p>
          <div className="button-container">
            <button className="update-button" onClick={handleUpdate}>
              Update
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
