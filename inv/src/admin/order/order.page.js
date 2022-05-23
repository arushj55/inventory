import { Outlet} from "react-router-dom";

export function OrderPage(){
    return (<>
        <div className="container-fluid px-4">
            <Outlet />        
        </div>
    </>)
}