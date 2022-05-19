import { NavLink } from "react-router-dom"
export function AdminPageTitle({title, bread_crumb, add_link }){

    return (<>
        <h1 className="mt-4">
            {title}
            {add_link ?  <NavLink to={add_link} className="btn btn-sm btn-success float-end my-3">
                <i className="fas fa-paper-plane"></i>
                &nbsp;
                Add {title}
            </NavLink> : <></>}
        </h1>
        <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
                <NavLink to="/admin">Dashboard</NavLink>
            </li>

            <li className="breadcrumb-item active">{bread_crumb}</li>
        </ol>
        
    </>)
}