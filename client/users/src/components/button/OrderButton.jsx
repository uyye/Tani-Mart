import "./button.css"

export default function OrderButton({children, handleOrder}) {


    
    return(
        <button className="order-button" onClick={handleOrder}>{children}</button>
    )
}