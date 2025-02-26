import "./Presale.css";
import {Timer} from "lucide-react";
import { Link } from "react-router-dom";
import SideNavbar from "../components/sideNavbar/SideNavbar";
import {useSelector, useDispatch} from "react-redux"
import { useEffect } from "react";
import { fetchPresaleProduct } from "../features/products/productSlice";
import formateDate from "../helpers/formateDate";
import { formatIDR } from "../helpers/formatIDR";

const presaleItems = [
  {
    id: "PRE001",
    product: "Bawang",
    startDate: "2025-03-20",
    endDate: "2025-04-20",
    price: "Rp 25.000",
    normalPrice: "Rp 27.000",
    stock: 500,
    sold: 125,
    status: "active",
  },
  {
    id: "PRE002",
    product: "Tomat",
    startDate: "2025-03-25",
    endDate: "2025-04-25",
    price: "Rp 3.500",
    normalPrice: "Rp 4.000",
    stock: 300,
    sold: 50,
    status: "upcoming",
  },
  {
    id: "PRE003",
    product: "Paket Alat Pertanian Premium",
    startDate: "2024-02-15",
    endDate: "2024-03-15",
    price: "Rp 1.500.000",
    normalPrice: "Rp 1.800.000",
    stock: 100,
    sold: 100,
    status: "ended",
  },
];

export default function Presale() {
const presaleProducts = useSelector((state)=>state.products.presales)
console.log(presaleProducts);

const dispatch = useDispatch()


useEffect(()=>{
  dispatch(fetchPresaleProduct())
}, [dispatch])

  return (
    <div className="container">
      {/* Sidebar */}
      <SideNavbar/>

      <div className="space-y-6">
        {/* Presale Items */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Daftar Presale
              </h2>
              <div className="flex gap-2">
                <select className="border rounded-lg px-3 py-2">
                  <option>Semua Status</option>
                  <option>Active</option>
                  <option>Upcoming</option>
                  <option>Ended</option>
                </select>
              </div>
            </div>
            <div className="grid gap-6">
              {presaleProducts?.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.Product.name}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <Timer size={16} />
                        <span>
                          {formateDate(item.startDate)} - {formateDate(item.endDate)}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "active"
                          ? "bg-green-100 text-green-800"
                          : item.status === "upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {/* {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)} */}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Harga Presale</p>
                      <p className="font-semibold text-green-600">
                        {formatIDR(item.Product.price)}
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        {item.normalPrice}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Stok</p>
                      <p className="font-semibold">{item.Product.stock}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Terjual</p>
                      <p className="font-semibold">{item.sold} </p>
                    </div>
                    <div className="flex items-end">
                      <Link to="/admin/editPresale">
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit Presale
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
