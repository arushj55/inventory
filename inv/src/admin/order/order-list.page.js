import { useEffect, useState } from "react";
import { getItems } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { toast } from "react-toastify";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox-plus-jquery.js"
import { NavLink } from "react-router-dom";


export function OrderList() {
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    let role = user.role;
    let url=("URL",window.location.pathname);
    console.log(url.slice(17));

    const [data, setData] = useState([]);
    let d = []
    let p =[]
    const getAllOrders = async () => {
        try {
            let result = await getItems('/order/')
            result.data.result.map((o, i) => {
                if (o.status === 'sale') {
                    d.push(o);
                }

            })
            setData(d);
        } catch (error) {
            // error handle
            toast.error("Error while fetching order data");
        }
    }
    useEffect(() => {
        getAllOrders()
    }, []);



    return (<>

        <AdminPageTitle
            title="Sale"
            bread_crumb="Sale List"
            add_link="/dashboard/order/create/sale"
        />

        <div className="card mb-4">
            <div className="card-body">
                <table className="table table-hover table-bordered table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>S.N</th>
                            <th>Bill Number</th>
                            <th>Retailer</th>
                            <th>Product</th>
                            <th>Status</th>
                            <td>State</td>
                            <th>Quantity</th>
                            {
                                role && role === 'admin'
                                    ?
                                    <>
                                        <th>Price</th>
                                    </> :
                                    <>

                                    </>
                            }

                            <th>Sub Total</th>
                            {
                                role && role === 'admin'
                                    ?
                                    <>
                                        <th>Pdf</th>
                                    </> :
                                    <>
                                        <th>Action</th>
                                    </>
                            }


                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((o, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{o.bill_number}</td>
                                <td>{o.retailer?.full_name}</td>
                                <td>{o.product?.product_name}</td>
                                <td>{o?.status}</td>
                                <td>{o?.state}</td>
                                <td>{o.quantity}</td>
                                {
                                    role && role == 'admin'
                                        ?
                                        <>
                                            <td>{o.price}</td>

                                        </> :
                                        <>

                                        </>
                                }

                                <td>{o.sub_total}</td>
                                {
                                    role && role == 'admin'
                                        ?
                                        <>
                                            <td>
                                                <NavLink to={"/dashboard/pdf" + o._id} className="btn btn-sm btn-danger btn-rounded"><i class="fa-solid fa-file-pdf"></i></NavLink>
                                            </td>

                                        </> :
                                        <>
                                            <td>

                                                <NavLink to={"/dashboard/order/" + o._id} className="btn btn-sm btn-success btn-rounded" >
                                                    <i className="fa fa-pen"></i>
                                                </NavLink>
                                            </td>
                                        </>
                                }



                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    </>)
}

export function PurchaseList(){
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    let role = user.role;
    let url=("URL",window.location.pathname);
    console.log(url.slice(17));

    const [purchase,setPurchase] = useState([]);

    let p =[]
    const getAllOrders = async () => {
        try {
            let result = await getItems('/order/')
            result.data.result.map((o, i) => {
                if (o.status === 'purchase') {
                    p.push(o);
                }
                

            })
            
            setPurchase(p);
        } catch (error) {
            // error handle
            toast.error("Error while fetching order data");
        }
    }
    useEffect(() => {
        getAllOrders()
    }, []);



    return (<>

        <AdminPageTitle
            title="Purchase"
            bread_crumb="Purchase List"
            add_link="/dashboard/order/create/purchase"
        />

        <div className="card mb-4">
            <div className="card-body">
                <table className="table table-hover table-bordered table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>S.N</th>
                            <th>Bill Number</th>
                            <th>Supplier</th>
                            <th>Product</th>
                            <th>Status</th>
                            <td>State</td>
                            <th>Quantity</th>
                            {
                                role && role === 'admin'
                                    ?
                                    <>
                                        <th>Price</th>
                                    </> :
                                    <>

                                    </>
                            }

                            <th>Sub Total</th>
                            {
                                role && role === 'admin'
                                    ?
                                    <>
                                    </> :
                                    <>
                                        <th>Action</th>
                                    </>
                            }


                        </tr>
                    </thead>
                    <tbody>
                        {purchase && purchase.map((o, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{o.bill_number}</td>
                                <td>{o.supplier?.name}</td>
                                <td>{o.product?.product_name}</td>
                                <td>{o?.status}</td>
                                <td>{o?.state}</td>
                                <td>{o.quantity}</td>
                                {
                                    role && role == 'admin'
                                        ?
                                        <>
                                            <td>{o.price}</td>

                                        </> :
                                        <>

                                        </>
                                }

                                <td>{o.sub_total}</td>
                                {
                                    role && role == 'admin'
                                        ?
                                        <>
                                            

                                        </> :
                                        <>
                                            <td>

                                                <NavLink to={"/dashboard/order/" + o._id} className="btn btn-sm btn-success btn-rounded" >
                                                    <i className="fa fa-pen"></i>
                                                </NavLink>
                                            </td>
                                        </>
                                }



                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    </>)
}