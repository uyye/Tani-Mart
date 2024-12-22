import { useEffect, useState } from "react"
import "./detailOrder.css"
import instance from "../../api/axiosInstance"
import { useParams } from "react-router-dom"
import Table from "../../components/table/Table"


export default function DetailOrder() {
    const {id} = useParams()
    const [detailOrder, setDetailOrder] = useState([])  
    
    console.log(detailOrder, "SSSSSSSSSSSSSSSSSSS");
    

    const fetchDetailOrder =  async()=>{
        try {
            const {data} = await instance({
                method:"get",
                url:`/orders/${id}`,
                headers:{
                    "Authorization":`bearer ${localStorage.getItem("access_token")}`
                }
            })

            setDetailOrder(data)
        } catch (error) {
            console.log(error);
            
        }
    }
    
    
    useEffect(()=>{
        fetchDetailOrder()
    },[id])

    return(
        <div className="detailOrder-container">
            <h1>Detail pesanan</h1>
            {
                detailOrder
                ?<Table data={detailOrder}/>
                :<p>Anda belum melakukan pemesanan</p>
            }
            <div>
                <table className="productTable">
                    <thead>
                        <tr>
                            <th>Nama penerima</th>
                            <th>Alamat pengiriman</th>
                            <th>Nomor telepon</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>{detailOrder.addressShiping}</td>
                            <td>{detailOrder.phoneNumber}</td>
                            <td>{detailOrder.status}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
                
        </div>
    )
}