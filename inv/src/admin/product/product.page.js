import {NavLink, Outlet} from "react-router-dom";

export const ProductPage = () =>{
    return (<>
        <div className="container-fluid px-4">
            <Outlet />        
        </div>
    </>)
}