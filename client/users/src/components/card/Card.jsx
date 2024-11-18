import "./card.css";
import jangkauanluas from "../../assets/jangkauanpasarluas.png";
import tranksaksi from "../../assets/tranksaksi.png";
import waktu from "../../assets/waktu.png";
import percaya from "../../assets/percaya.png";
import produk from "../../assets/wk.png";
export default function Card() {
  return (
    <div>
      <section className="untung">
        <h2>
          Keuntungan <span>Siafarm</span>
        </h2>
        <div className="keuntungan-list"></div>
      </section>
      <div className="keuntungan-item">
        <img src={jangkauanluas} />
        <h3>Meningkatkan Jangkauan Pasar</h3>
        <p>
          Produk pertanian Anda dapat menjangkau lebih banyak pembeli di luar
          area lokal
        </p>
      </div>
      <div class="keuntungan-item">
        <img src={tranksaksi} />
        <h3>Kemudahan Transaksi dan Pemesanan</h3>
        <p>
          SIAFARM menyediakan fitur transaksi mudah dan melakukan pemesanan
          langsung tanpa harus bertemu.
        </p>
      </div>
      <div class="keuntungan-item">
        <img src={waktu} />
        <h3>Efisiensi Waktu dan Biaya</h3>
        <p>
          Penggunaan platform menghemat biaya pemasaran serta waktu perjalanan
          untuk promosi bagi petani.
        </p>
      </div>
      <div class="keuntungan-item">
        <img src={percaya} />
        <h3>Transparansi dan Kepercayaan</h3>
        <p>
          Informasi produk yang lengkap meningkatkan transparansi dan
          kepercayaan antara petani dan pembeli.
        </p>
      </div>
      <div class="keuntungan-item">
        <img src={produk} />
        <h3>Kemudahan dalam Pengelolaan Produk</h3>
        <p>
          Petani dapat mengelola produk dengan mudah, termasuk memperbarui stok,
          harga, dan menambah produk baru secara langsung.
        </p>
      </div>
    </div>
  );
}
