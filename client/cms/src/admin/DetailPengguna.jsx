import { useParams } from "react-router-dom";
import "./DetailPengguna.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDetailUser } from "../features/users/userSlice";
import formateDate from "../helpers/formateDate";
import SideNavbar from "../components/sideNavbar/SideNavbar";


export default function DetailPengguna() {

  const { id } = useParams();
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.users.detailUser)
  console.log(user);
  
  useEffect(()=>{
    dispatch(fetchDetailUser(id))
  },[dispatch, id])

  return (
    <div className="container">
      <SideNavbar/>
      <div className="detail-pengguna-container">
      <h2>Detail Pengguna</h2>
      <div className="detail-card">
        <div className="detail-row">
          <span className="label">ID Pengguna:</span>
          <span className="value">{user.id}</span>
        </div>
        <div className="detail-row">
          <span className="label">Nama:</span>
          <span className="value">{user.name}</span>
        </div>
        <div className="detail-row">
          <span className="label">No HP:</span>
          <span className="value">{user.phoneNumber}</span>
        </div>
        <div className="detail-row">
          <span className="label">Peran:</span>
          <span className={`value role-${user.role}`}>
            {user.role}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Alamat:</span>
          <span className="value">{user.address}</span>
        </div>
        <div className="detail-row">
          <span className="label">Tanggal Bergabung:</span>
          <span className="value">{formateDate(user.createdAt)}</span>
        </div>
      </div>
    </div>
    </div>
  );
}
