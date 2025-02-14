import "./button.css"

export default function OrderButton({children, handleOrder, isPresale}) {


    
    return(
        <button className={`order-button`} onClick={handleOrder}>{children}</button>
    )
}