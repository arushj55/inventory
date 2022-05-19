import { Outlet} from "react-router-dom";

export function SupplierPage(){
    return (<>
        <div className="container-fluid px-4">
            <Outlet />        
        </div>
    </>)
}