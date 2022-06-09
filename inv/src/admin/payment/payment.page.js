import { Outlet} from "react-router-dom";

export function PaymentPage(){
    return (<>
        <div className="container-fluid px-4">
            <Outlet />        
        </div>
    </>)
}