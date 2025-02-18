import { useParams } from "react-router-dom";
import "./DetailProduk.css";

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

  return (
    <div className="detail-produk-container">
      <h2>Detail Produk</h2>

      <div className="produk-detail-card">
        <img
          src={productData.image}
          alt={productData.name}
          className="produk-image"
        />
        <div className="produk-info">
          <p>
            <strong>ID Produk:</strong> {productData.id}
          </p>
          <p>
            <strong>Nama Produk:</strong> {productData.name}
          </p>
          <p>
            <strong>Kategori:</strong> {productData.category}
          </p>
          <p>
            <strong>Harga Satuan:</strong> Rp{" "}
            {productData.price.toLocaleString()}
          </p>
          <p>
            <strong>Stok:</strong> {productData.stock}
          </p>
          <p>
            <strong>Status:</strong> {productData.status}
          </p>
          <p>
            <strong>Deskripsi:</strong> {productData.description}
          </p>
          <p>
            <strong>Nama Toko:</strong> {productData.store}
          </p>
          <p>
            <strong>Nomor Toko:</strong> {productData.storeNumber}
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
  );
}
