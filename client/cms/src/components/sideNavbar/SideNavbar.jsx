import "./sideNavbar.css";
// icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaProductHunt, FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import logo from "../../assets/logo.png";

import { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    icons: <IoHomeOutline size={30} />,
    label: "Home",
    toGo: "/admin/dashboard",
  },
  {
    icons: <FaProductHunt size={30} />,
    label: "Products",
    toGo: "/admin/KelolaProduk",
  },
  {
    icons: <LuUsers size={30} />,
    label: "Pengguna",
    toGo: "/admin/KelolaPengguna",
  },
  {
    icons: <IoLogoBuffer size={30} />,
    label: "Transaksi",
    toGo: "/admin/KelolaTranksaksi",
  },
  //   { icons: <CiSettings size={30} />, label: "Setting" },
  //   { icons: <TbReportSearch size={30} />, label: "Report" },
];

export default function SideNavbar() {
  const [open, setOpen] = useState(true);

  return (
    <nav className={`sidebar ${open ? "open" : "closed"}`}>
      {/* Header */}
      <div className="header">
        <img
          src={logo}
          alt="Logo"
          className={`${open ? "logoOpen" : "logoClosed"}`}
        />
        <MdMenuOpen
          size={34}
          className={`menuIcon ${!open && "menuIconClosed"}`}
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Body */}
      <ul className="menuList">
        {menuItems.map((item, index) => (
          <li key={index} className="menuItem">
            <Link to={item.toGo} className="menuLink">
              {item.icons}
              {open && <p className="menuLabel">{item.label}</p>}
            </Link>
            {!open && <span className="tooltip">{item.label}</span>}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="footer">
        <FaUserCircle size={30} />
        {open && (
          <div className="userInfo">
            <p>Admin</p>
          </div>
        )}
      </div>
    </nav>
  );
}
