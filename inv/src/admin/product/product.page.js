import {Outlet} from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const ProductPage = () =>{
    return (<>
        <div className="container-fluid px-4">
            <ToastContainer/>
            <Outlet />        
        </div>
    </>)
}