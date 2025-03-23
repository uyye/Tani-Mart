import { useParams } from "react-router-dom";
import "./orderDetail.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataDetailOrder } from "../../features/orders/orderSlice";
import ContactButton from "../../components/contactButton/ContactButton";

export default function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orders.orderDetail);

  console.log(data);

  useEffect(() => {
    dispatch(fetchDataDetailOrder(id));
  }, [dispatch, id]);

  return (
    <div className="orderDetail-container">
      <h1>Detail Order</h1>
      <section className="order-list">
        <table>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Nama penerima</th>
              <th>Produk</th>
              <th>Lokasi pengiriman</th>
              <th>Jumlah</th>
              <th>Sub total</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data?.map((x, y) => {
                return (
                  <tr key={y + 1}>
                    <td>{x.orderId}</td>
                    <td>{x.Order.User.name}</td>
                    <td>{x.Product.name}</td>
                    <td>{x.Order.addressShiping}</td>
                    <td>{x.quantity} Kg</td>
                    <td>
                      {x.subTotal.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>Tidak ada pesanan</td>
              </tr>
            )}
            <tr>
              <td colSpan={6}>
                <ContactButton
                  phoneNumber={data[0]?.Order.phoneNumber}
                  addressShiping={data[0]?.Order.addressShiping}
                  userName={data[0]?.Order.User.name}
                >
                  Hubungi pembeli
                </ContactButton>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
