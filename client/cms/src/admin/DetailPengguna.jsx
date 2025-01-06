// ReactJS Code
import React, { useEffect } from "react";
import "./DetailPengguna.css";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { fetchDeleteUser, fetchDetailUser } from "../features/users/userSlice";
import DeleteButton from "../components/deleteButton/DeleteButton";
import UpdateButton from "../components/updateButton/UpdateButton";

const UserDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.users.detailUser)

  const handleDelete = ()=>{
    dispatch(fetchDeleteUser(id))
    navigate("/KelolaPengguna")
  }

  useEffect(()=>{
    dispatch(fetchDetailUser(id))
  },[])
  

  return (
    <div className="user-detail">
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
          <UpdateButton/>
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
