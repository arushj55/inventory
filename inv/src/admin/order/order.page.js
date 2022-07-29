import { Outlet} from "react-router-dom";
import { ToastContainer } from "react-toastify";

export function OrderPage(){
    return (<>
    <ToastContainer/>
        <div className="container-fluid px-4">
            <Outlet />        
        </div>
    </>)
}