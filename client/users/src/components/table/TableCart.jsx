import { Link } from "react-router-dom";
import DeleteButton from "../button/DeleteButton";
import DetailButton from "../button/DetailButton";
import { useDispatch } from "react-redux";
import { fetchRemoveCart } from "../../features/carts/cartSlice";

export default function TableCart({cart, selectedItems, handleCheckboxChange}) {

  const dispatch = useDispatch()
  
  const handleRemoveCart = (itemId)=>{
    dispatch(fetchRemoveCart(itemId))
  }
    
    return(
        <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Produk</th>
            <th>Jumlah</th>
            <th>Harga Satuan</th>
            <th>Subtotal</th>
            <th>Pilih</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.CartItems?.length > 0 ?
            cart.CartItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item?.Product?.name}</td>
                <td>{item.quantity}</td>
                <td>Rp {Number(item?.Product?.price).toLocaleString()}</td>
                <td>Rp {(item.quantity * item.Product?.price).toLocaleString()} </td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td>
                  <DeleteButton handleDelete={()=>handleRemoveCart(item.id)}/>
                  <Link to={`/detail/${item?.Product?.id}`}><DetailButton/></Link>
                </td>
              </tr>
            )):
            <td colSpan={6}>Anda belum memesan product SIAFARM</td>
          }
        </tbody>
      </table>
    )
}