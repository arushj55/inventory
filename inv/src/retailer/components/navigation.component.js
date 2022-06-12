import {NavLink, useNavigate} from "react-router-dom"
import "../../pages/map.css"
export function RetailerTopNav({title}) {
    let navigate = useNavigate();
    const sidebarToggleEvent = (event) => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    
    }
            
    const logout = (e) => {
        
        localStorage.removeItem("reactuser_user");
        localStorage.removeItem('reactuser_token');

        navigate('/');
    
    }
    return (<>
        <nav className="sb-topnav navbar navbar-expand navbar-dark">

            <NavLink className="navbar-brand ps-3" to="/dashboard/retailer" style={{color:"black"}}>
                  {title} Panel
            </NavLink>

            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" onClick={sidebarToggleEvent} href="#!" style={{color:"black"}}><i className="fas fa-bars"></i></button>

            <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">   
            </div>

            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black"}}><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li>
                            <button className="dropdown-item " onClick={logout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
            </nav>
    </>)
}