import { NavLink } from "react-router-dom";

export function AdminDashboard() {
      
    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4">Dashboard Page</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <NavLink to="/admin">Dashboard</NavLink>
                    </li>
                    <li className="breadcrumb-item active"></li>
                </ol>
                <div className="card mb-4">
                    <div className="card-body">
                       
                    </div>
                </div>
            </div>
        </>
    );
}