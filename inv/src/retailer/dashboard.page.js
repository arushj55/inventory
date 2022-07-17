import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getItems } from "../service/axios.service";
import "../pages/map.css"
import { InitialOrder } from "./components/tablecomp";
import { PaymentTable } from "./components/paymenttable";

export function RetailerDashboard() {
    let [total, setTotal] = useState()
    let [pay, setPaid] = useState()
    let [count, setCount] = useState()
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    let t = 0;
    let c = 0;
    let d = 0;

    const getAllOrder = async () => {
        try {
            let res = await getItems('/order/')
            let data = res.data.result;
            let count = res.data.result.length;
            for (let i = 0; i < count; i++) {
                if (data[i].retailer.email === user.email) {
                    t += data[i].sub_total;
                    c++;
                }

                setTotal(t);
                setCount(c);
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    const getAllPayment = async () => {
        try {
            let res = await getItems('/payment/')
            let data = res.data.result;
            let count = res.data.result.length;
            for (let i = 0; i < count; i++) {
                if (data[i].paid_by === user.email) {
                    d += data[i].paid_amount;
                }
                setPaid(d);
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getAllOrder();
        getAllPayment();
    },[])
    return (
        <>
            <div className="container-fluid">
                <div className="page-header">
                    <h1 className="page-title">
                        <span className="page-title-icon bg-gradient-danger text-white mr-2">
                            <NavLink to="/retailer">
                                <i className="fa-solid fa-house" style={{ color: "white" }}></i>
                            </NavLink>
                        </span> Dashboard 

                        </h1>

                       
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
                                <h2 className="mb-5">Rs.{total-pay}</h2>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                                
                                <h1>Order Detail</h1>
                                <InitialOrder />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                                
                                <h1>Payment Detail</h1>
                                <PaymentTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}