import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import { getItems } from "../service/axios.service";
import "../pages/map.css"
export function RetailerDashboard() {
    let [total,setTotal]=useState()
    let [count,setCount]=useState()
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    getItems("/order/")
        .then((suc) => {
            let total=0;
            let c=0;
            let data = suc.data.result;
            let count = suc.data.result.length;
            for (let i = 0; i < count; i++) {
                if (data[i].retailer._id === user.id) {
                    total+=data[i].sub_total;
                    c++;
                }
                setTotal(total);
                setCount(c);
            }
        })
        .catch((err) => {
            console.log("error", err);
        })
    return (
        <>
            <div className="container-fluid">
                <div className="page-header">
                    <h1 className="page-title">
                        <span className="page-title-icon bg-gradient-primary text-white mr-2">
                            <NavLink to="/retailer">
                                <i className="fa-solid fa-house" style={{ color: "white" }}></i>
                            </NavLink>
                        </span> Dashboard </h1>

                </div>
                <div className="row">
                    <div className="col-md-4 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                                <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                                <h4 className="font-weight-normal mb-3">Number of Purchsed<i className="fa-solid fa-chart-line right"></i>
                                </h4>
                                <h2 className="mb-5">{count}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                                <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                                <h4 className="font-weight-normal mb-3">Total Amount<i className="fa-solid fa-chart-line right"></i>
                                </h4>
                                <h2 className="mb-5">Rs.{total}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                                <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                                <h4 className="font-weight-normal mb-3">Due Amount <i className="fa-solid fa-chart-line right"></i>
                                </h4>
                                <h2 className="mb-5">Rs.15000</h2>
                            </div>
                        </div>
                    </div>
                </div>



            </div>


        </>
    );
}