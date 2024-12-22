import "./table.css";

export default function Table({data}){

    console.log(data.OrderDetails," di table");
    
    const handleWhatsAppRedirect = () => {
        const message = `Halo, saya ingin Mengetahui info pesanan saya.`;
        const whatsappURL = `https://wa.me/6287777635123?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    };
    
    return(
        <div>
            <table className="productTable">
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
                                    <button
                                        onClick={() =>
                                            handleWhatsAppRedirect()
                                        }
                                        className="whatsappButton"
                                    >
                                        Hubungi Penjual
                                    </button>
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
