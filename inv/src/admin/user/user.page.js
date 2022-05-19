import { Outlet} from "react-router-dom";

export function UserPage(){
    return (<>
        <div className="container-fluid px-4">
            <Outlet />        
        </div>
    </>)
}