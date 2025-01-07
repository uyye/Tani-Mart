import { Outlet } from "react-router-dom";
import SideNavbar from "../components/sideNavbar/SideNavbar";
import "./adminMain.css"

export default function AdminMain() {
    return(
        <div className="container">
            <SideNavbar/>
            <Outlet/>
        </div>
    )
}