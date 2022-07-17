import { NavLink } from "react-router-dom";
import React from 'react';
import { Chart } from "../admin/components/chart";
import "../pages/map.css"
import { getItems } from "../service/axios.service"
import { useState } from "react";
import { ContactTable } from "../component/common/contact";
import { OTable } from "./components/table";
export function AdminDashboard() {
  let [sales, setSales] = useState()
  let [purchase, setPurchase] = useState()
  let [total, setTotal] = useState()
  let [pending, setPending] = useState()
  let [delivered, setDelivered] = useState()
  let [date, setDate] = useState()
  let [due, setDue] = useState()
  let [supplier, setSupplier] = useState()
  let [product, setProduct] = useState()
  let user = JSON.parse(localStorage.getItem('reactuser_user'));
  let role = user.role;
  getItems("/order/")
    .then((suc) => {
      let s = 0;
      let p = 0;
      let c = 0;
      let d = 0;
      let date = ''
      let total = 0;
      let data = suc.data.result;
      let count = suc.data.result.length;
      for (let i = 0; i < count; i++) {
        date = (new Date(data[i].createdAt).toLocaleString('default', { month: 'long' }))
        if (data[i].status === "sale") {
          s++;
          total += data[i].sub_total
        }
        if (data[i].status === "purchase") {
          p++;
        }
        if (data[i].state === "pending") {
          c++;
        }
        else {
          d++;
        }
      }
      setDate(date)
      setSales(s)
      setPurchase(p)
      setTotal(total);
      setPending(c);
      setDelivered(d);
    })
    .catch((err) => {
      console.log("error", err);
    })

  getItems("/supplier/")
    .then((suc) => {
      let count = suc.data.result.length;
      setSupplier(count);
    })
    .catch((err) => {
      console.log("error", err);
    })

  getItems("/product/")
    .then((suc) => {
      let count = suc.data.result.length;
      setProduct(count);
    })
    .catch((err) => {
      console.log("error", err);
    })
    getItems("/payment/")
    .then((suc) => {
      let due = 0;
      for(let i=0;i<suc.data.result.length;i++)
      {
        due += suc.data.result[i].due_amount
      }
      setDue(due);
    })

    .catch((err) => {
      console.log("error", err);
    })



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
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Number of Supplier <i className="fa-solid fa-chart-line right"></i>
                </h4>
                <h2 className="mb-5">{supplier}</h2>

              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Number of Product <i className="fa-solid fa-chart-line right"></i>
                </h4>
                <h2 className="mb-5">{product}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Pending Order <i className="fa-solid fa-chart-line right"></i>
                </h4>
                <h2 className="mb-5">{pending}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Delivered Order <i className="fa-solid fa-chart-line right"></i>
                </h4>
                <h2 className="mb-5">{delivered}</h2>
              </div>
            </div>
          </div>
          {
            role && role == 'admin'
              ?
              <>
                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-info card-img-holder text-white">
                    <div className="card-body">
                      <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                      <h4 className="font-weight-normal mb-3">Total Sales Amount <i className="fa-solid fa-chart-line right"></i>
                      </h4>
                      <h2 className="mb-5">Rs.{total}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 stretch-card grid-margin">
                  <div className="card bg-gradient-info card-img-holder text-white">
                    <div className="card-body">
                      <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                      <h4 className="font-weight-normal mb-3">Receivable Amount <i className="fa-solid fa-chart-line right"></i>
                      </h4>
                      <h2 className="mb-5">Rs.{due}</h2>
                    </div>
                  </div>
                </div>
              </> :
              <>
              </>
          }

        </div>
      </div>

      <div className="container-fluid ">
        <div className="row mt-5">
          {
            role && role === "admin"
              ?
              <>
              <div className="col-md-12 stretch-card grid-margin">
                  <div class="card bg-gradient-info card-img-holder text-white">
                    <div class="card-body">
                      <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                      <h4 className="font-weight-normal mb-3">Contact Table <i className="fa-solid fa-address-book"></i>
                      </h4>
                      <ContactTable />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <Chart sales={sales} purchase={purchase} date={date} />
                </div>
                


              </> :
              <>
                <div className="col-md-12 stretch-card grid-margin">
                  <div class="card bg-gradient-info card-img-holder text-white">
                    <div class="card-body">
                      <img src={require("../assets/image/circle.png")} className="card-img-absolute" alt="circle" />
                      <h4 className="font-weight-normal mb-3">Order Table <i className="fa-solid fa-address-book"></i>
                      </h4>
                      <OTable/>
                    </div>
                  </div>
                </div>

              </>

          }
        </div>
      </div>




    </>
  );
}