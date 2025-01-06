import AdminButton from "../adminButton/AdminButton"
import "./adminCart.css"

export default function AdminCart({icon, children, length, goTo}) {
    return(
        <div className="container-card">
            <div className="content-admin">
                <h1>{icon}{children}</h1>
                <p className="card-length">{length}</p>
            </div>
            <div className="content-admin">
                <hr />
                    <AdminButton goTo={goTo}/>
            </div>
        </div>
    )
}