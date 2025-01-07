// ReactJS Code
import React, { useEffect } from "react";
import "./dataDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { fetchDeleteUser, fetchDetailUser } from "../features/users/userSlice";
import DeleteButton from "../components/deleteButton/DeleteButton";
import UpdateButton from "../components/updateButton/UpdateButton";
import ContactButton from "../components/contactButton/ContactButton";
import Swal from "sweetalert2";

const UserDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.users.detailUser)

  const handleDelete = async ()=>{
    const result = await Swal.fire({
      position: "center",
      icon: "warning",
      title: "Serius!",
      text: "Kamu ingin menghapus pengguna ini?",
      showCancelButton: true,
      confirmButtonText: "Lanjutkan",
      cancelButtonText: "Batal",
    });

    if(result.isConfirmed){
      dispatch(fetchDeleteUser(id))
      
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "delete successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/admin/KelolaPengguna")
    }
    
  }

  useEffect(()=>{
    dispatch(fetchDetailUser(id))
  },[])
  

  return (
    <div className="data-detail">
      <h1>Detail Pengguna</h1>
      <div className="detail-container">
        <div className="detail-item">
          <label>ID:</label>
          <p>{user.id}</p>
        </div>
        <div className="detail-item">
          <label>Nama:</label>
          <p>{user.name}</p>
        </div>
        <div className="detail-item">
          <label>Peranan:</label>
          <p>{user.role}</p>
        </div>
        <div className="detail-item">
          <label>No Hp:</label>
          <p>{user.phoneNumber}</p>
        </div>
        <div className="detail-item">
          <label>Alamat:</label>
          <p>{user.address}</p>
        </div>
        <div className="control-button">
          <DeleteButton handleFunction={()=>handleDelete()}/>
          <ContactButton phoneNumber={user.phoneNumber}>Whatsapp</ContactButton>
        </div>
      </div>
    </div>
  );
};

// Example usage
const exampleUser = {
  id: 1,
  name: "John Doe",
  role: "Petani",
  phone: "123-456-7890",
  address: "Jalan Karakasia, Bantaeng",
};

export default function App() {
  return <UserDetail user={exampleUser} />;
}
