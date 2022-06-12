import { NavLink } from "react-router-dom";
import React from 'react';
import "../pages/map.css"
export function RetailerDashboard() {
    
    return (
        <>
            <div className="container-fluid">
                <div className="page-header">
                    <h1 className="page-title">
                        <span className="page-title-icon bg-gradient-primary text-white mr-2">
                        <NavLink to="/retailer">
                        <i className="fa-solid fa-house" style={{color:"white"}}></i>
                        </NavLink>
                        </span> Dashboard </h1>
                        
                </div>
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


        </>
    );
}