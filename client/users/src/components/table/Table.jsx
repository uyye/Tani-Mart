import ContactButton from "../button/ContactButton";
import "./table.css";

export default function Table({data}){
    
    return(
        <div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Produk</th>
                        <th>Jumlah pesanan</th>
                        <th>Harga satuan</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.OrderDetails?.map((x,y)=>{
                            return(
                                <tr key={y}>
                                    <td className="detailProduct">
                                        <img src={x.Product.image} alt=""  className="productImg"/>
                                        <p>{x.Product.name}</p>
                                    </td>
                                    <td>{x.quantity}</td>
                                    <td>Rp.{Number(x.Product.price).toLocaleString()}</td>
                                    <td>Rp.{Number(x.quantity * x.Product.price).toLocaleString()}</td>
                                    <td>
                                    <ContactButton phoneNumber={x.Product.User.phoneNumber}>Hubungi penjual</ContactButton>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
                
            </table>
        </div>
    )
}
