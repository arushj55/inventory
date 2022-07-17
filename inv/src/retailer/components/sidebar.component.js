import { NavLink } from "react-router-dom";
import "../../pages/map.css"
export function RetailerSidebar() {
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    return (<>
        <nav className="sb-sidenav accordion sb-sidenav" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Features</div>
                    <NavLink className="nav-link" to="/retailer" style={{color:"black"}}>
                        <div className="sb-nav-link-icon" style={{color:"hsl(223, 97%, 69%)"}}><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </NavLink>
                    <NavLink className="nav-link" to="/retailer/pdf" style={{color:"black"}}>
                        <div className="sb-nav-link-icon" style={{color:"hsl(223, 97%, 69%)"}}><i className="fa-solid fa-file"></i></div>
                        Report
                    </NavLink>
                   
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {user.name}
            </div>
        </nav>
    </>)
}