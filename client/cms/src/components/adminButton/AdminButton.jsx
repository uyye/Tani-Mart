import { useNavigate } from "react-router-dom"
import "./adminButton.css"


export default function AdminButton({goTo}) {

    const navigate = useNavigate()
    const handleButton = ()=>{
        navigate(goTo)
    }
    return(
        <button className="admin-button" onClick={handleButton}>Kelola Data</button>
    )
}