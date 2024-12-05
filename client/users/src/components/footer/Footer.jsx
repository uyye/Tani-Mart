import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="socials">
        <a href="#">
          <FaFacebook />
        </a>
        <a href="#">
          <FaXTwitter />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
      </div>
      <div className="links">
        <Link to="/">Beranda</Link>
        <Link to="/">Tentang Kami</Link>
        <Link to="/product">Produk</Link>
        <Link to="/presale">Presale</Link>
      </div>
      <div className="credit">
        <p>
          Created by <a href="">Azharwalikram</a>. | &copy; 2024
        </p>
      </div>
    </footer>
  );
}
