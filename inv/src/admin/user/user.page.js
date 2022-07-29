import { Outlet} from "react-router-dom";
import { ToastContainer } from "react-toastify";

export function UserPage(){
    return (<>
        <div className="container-fluid px-4">
            <ToastContainer/>
            <Outlet />        
        </div>
    </>)
}