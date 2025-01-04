import "./button.css"

export default function OrderButton({children, handleOrder, isPresale}) {


    
    return(
        <button className={`order-button ${!isPresale?"disabled":""}`} onClick={isPresale?handleOrder:undefined}>{children}</button>
    )
}