import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { toast } from "react-toastify";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox-plus-jquery.js"
import { ActionButton } from "../../component/action-button/action-button.component";
import { NavLink } from "react-router-dom";


export function OrderList() {
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    let role = user.role;
    const [data, setData] = useState([]);
    const getAllOrders = async () => {
        try {
            let result = await getItems('/order/')
            if (result.data.result) {
                setData(result.data.result)
            }
        } catch (error) {
            // error handle
            toast.error("Error while fetching order data");
        }
    }
    useEffect(() => {
        getAllOrders()
    }, []);

    const onDelete = (id) => {
        deleteItem('/order/' + id, true)
            .then((res) => {
                if (res.data.status) {
                    toast.success(res.data.msg);
                    getAllOrders()
                } else {
                    toast.error(res.data.msg);
                }
            })
            .catch((error) => {
                toast.error(error);
            })
    }

    return (<>

        <AdminPageTitle
            title="Order"
            bread_crumb="Order List"
            add_link="/dashboard/order/create"
        />

        <div className="card mb-4">
            <div className="card-body">
                <table className="table table-hover table-bordered table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>S.N</th>
                            <th>Bill Number</th>
                            <th>Supplier</th>
                            <th>Retailer</th>
                            <th>Product</th>
                            <th>Status</th>
                            <td>State</td>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Sub Total</th>
                            <th>Action</th>
                            {
                                role && role === 'admin'
                                    ?
                                    <>
                                        <th>Payment</th>
                                    </> :
                                    <>
                                    </>
                            }
                            <th>Pdf</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((o, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{o.bill_number}</td>
                                <td>{o.supplier?.name}</td>
                                <td>{o.retailer?.full_name}</td>
                                <td>{o.product?.product_name}</td>
                                <td>{o?.status}</td>
                                <td>{o?.state}</td>
                                <td>{o.quantity}</td>
                                <td>{o.price}</td>
                                <td>{o.sub_total}</td>

                                <td>
                                    <ActionButton
                                        editLink={"/dashboard/order/" + o._id}
                                        id={o._id}
                                        onDelete={onDelete}
                                    />
                                </td>
                                {
                                    role && role == 'admin'
                                        ?
                                        <>
                                            <td>
                                                <NavLink to={"/dashboard/transaction/create" + o._id} className="btn btn-sm btn-dark btn-rounded" >
                                                    <i className="fa-solid fa-money-check"></i>
                                                </NavLink>
                                            </td>

                                            <td>
                                                <NavLink to={"/dashboard/pdf" + o._id} className="btn btn-sm btn-success btn-rounded"><i class="fa-solid fa-file-pdf"></i></NavLink>
                                            </td>

                                        </> :
                                        <>
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