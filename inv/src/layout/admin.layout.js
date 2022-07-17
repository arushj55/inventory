import { Outlet, resolvePath } from "react-router-dom";
import "../assets/css/styles.css";
import "bootstrap/dist/js/bootstrap.bundle";


import { AdminTopNav, AdminSidebar, AdminFooter } from "../admin/components";


export function AdminLayout() {
    let title= JSON.parse(localStorage.getItem('reactuser_user'));
    let role = title.role;

    
    return (<>
        <AdminTopNav title={role}/>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <AdminSidebar />
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <Outlet />
                </main>
                <AdminFooter />
            </div>
        </div>

    </>);
}
