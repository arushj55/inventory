import { Outlet} from "react-router-dom";
import "../assets/css/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";

import { RetailerTopNav, RetailerSidebar, RetailerFooter } from "../retailer/components";


export function RetailerLayout() {
    let title= JSON.parse(localStorage.getItem('reactuser_user'));
    let role = title.role;

    
    return (<>
        <RetailerTopNav title={role}/>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <RetailerSidebar />
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <Outlet />
                </main>
                <RetailerFooter />
            </div>
        </div>

    </>);
}
