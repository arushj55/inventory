import {NavLink} from "react-router-dom";

export function AdminSidebar() {
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    let role = user.role;
    return (<>
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Features</div>
                    <NavLink className="nav-link" to="/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </NavLink>
                    
                   
                                   <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#product" aria-expanded="false" aria-controls="product">
                        <div className="sb-nav-link-icon"><i className="fa-solid fa-truck-ramp-box"></i></div>
                        Product
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="product" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                     <nav className="sb-sidenav-menu-nested nav">
                                            <NavLink className="nav-link" to="/dashboard/product/create">Create Product</NavLink>
                                            <NavLink className="nav-link" to="/dashboard/product">List Product</NavLink>
                                        </nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#supplier" aria-expanded="false" aria-controls="supplier">
                        <div className="sb-nav-link-icon"><i className="fa-solid fa-truck-field"></i></div>
                            Suppliers
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="supplier" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            <NavLink className="nav-link" to="/dashboard/supplier/create">Create Supplier</NavLink>
                                            <NavLink className="nav-link" to="/dashboard/supplier">List Supplier</NavLink>
                                        </nav>
                    </div>


                    { 
                        role && role == 'admin' 
                            ? 
                                <>
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#user" aria-expanded="false" aria-controls="user">
                        <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                       User
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="user" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                       <nav className="sb-sidenav-menu-nested nav">
                                            <NavLink className="nav-link" to="/dashboard/user/create">Create User</NavLink>
                                            <NavLink className="nav-link" to="/dashboard/user">List User</NavLink>
                                        </nav>
                    </div>

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#transaction" aria-expanded="false" aria-controls="transaction">
                        <div className="sb-nav-link-icon"><i className="fas fa-dollar"></i></div>
                        Transactions
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="transaction" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                            <NavLink className="nav-link" to="/dashboard/transaction/create">Create Transaction</NavLink>
                                            <NavLink className="nav-link" to="/dashboard/transaction">List Transaction</NavLink>
                                        </nav>
                    </div>

                    </>
                            : 
                        <></>
                    }

                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#order" aria-expanded="false" aria-controls="order">
                        <div className="sb-nav-link-icon"><i className="fas fa-shopping-cart"></i></div>
                        Orders
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="order" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <NavLink className="nav-link" to="/dashboard/order/create">Create Order</NavLink> 
                                            <NavLink className="nav-link" to="/dashboard/order">List Order</NavLink>
                                        </nav>
                    </div>

                    
                               
                    
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                {user.name}
            </div>
        </nav>
    </>)
}