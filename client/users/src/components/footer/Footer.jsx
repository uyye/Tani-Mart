import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="socials">
        <a href="https://web.facebook.com/profile.php?id=61571119247195">
          <FaFacebook />
        </a>
        <a href="https://x.com/Siafarmbantaeng">
          <FaXTwitter />
        </a>
        <a href="https://www.instagram.com/siafarmbantaeng/">
          <FaInstagram />
        </a>
      </div>
      <div className="links">
        <Link to="/">Beranda</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/product">Produk</Link>
        <Link to="/pesananSaya">Pesanan Saya</Link>
      </div>
      <div className="credit">
        <p>
          Created by <a href="">Azharwalikram</a>. | &copy; 2024
        </p>
      </div>
    </footer>
  );
}
