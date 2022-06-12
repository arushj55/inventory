import { NavLink } from "react-router-dom";
import React from 'react';
import { Chart } from "../admin/components/chart";
import "../pages/map.css"

export function AdminDashboard() {
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    let role = user.role;
    return (
        <>
            <div className="container-fluid">
                <h1 className="mt-4">Dashboard Page</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item">
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="breadcrumb-item active"></li>
                </ol>

                <div className="row">
                    <div className="col-md-4 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                                <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                                <h4 className="font-weight-normal mb-3">Weekly Sales <i className="fa-solid fa-chart-line right"></i>
                                </h4>
                                <h2 className="mb-5">$ 15,0000</h2>
                                <h6 className="card-text">Increased by 60%</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                                <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                                <h4 className="font-weight-normal mb-3">Weekly Sales <i className="fa-solid fa-chart-line right"></i>
                                </h4>
                                <h2 className="mb-5">$ 15,0000</h2>
                                <h6 className="card-text">Increased by 60%</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                                <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                                <h4 className="font-weight-normal mb-3">Weekly Sales <i className="fa-solid fa-chart-line right"></i>
                                </h4>
                                <h2 className="mb-5">$ 15,0000</h2>
                                <h6 className="card-text">Increased by 60%</h6>
                            </div>
                        </div>
                    </div>
                </div>



            </div>



            <div className="container-fluid">
            { 
                        role && role == 'admin' 
                            ? <><Chart /></>:
                            
                            <>
                            
                            </>
            }
                
            </div>


        </>
    );
}