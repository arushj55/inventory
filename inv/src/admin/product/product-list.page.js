import { useEffect, useState } from "react";
import { getItems } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { toast, ToastContainer } from "react-toastify";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox-plus-jquery.js"
import { NavLink } from "react-router-dom";
export function ProductList() {
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    let role = user.role;
    const [data, setData] = useState([]);

    const getAllProducts = async () => {
        try {
            let result = await getItems('/product/')
            if (result.data.result) {
                setData(result.data.result)
            }
        } catch (error) {
            // error handle
            toast.error("Error while fetching product data");
        }
    }
    useEffect(() => {
        getAllProducts()
    }, []);

    return (<>
        <ToastContainer />
        <AdminPageTitle
            title="Product"
            bread_crumb="Product List"
            add_link="/dashboard/product/create"
        />


        <div className="card mb-4">
            <div className="card-body">
                <table className="table table-hover table-bordered table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>S.N</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Supplier</th>
                            <th>Create At</th>
                            {
                                role && role === 'admin'
                                    ?
                                    <>
                                        <th>Action</th>
                                    </> :
                                    <>

                                    </>
                            }


                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((o, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{o.product_name}</td>
                                <td>{o.price_unit}</td>
                                <td>{o.quantity}</td>
                                <td>{o.supplier?.name}</td>
                                <td>{new Date(o.createdAt).toLocaleString('default', { month: 'long' })}
                                </td>
                                {
                                    role && role === 'admin'
                                        ?
                                        <>
                                            <td>
                                                <NavLink to={"/dashboard/order/create/purchase/" + o._id} className="btn btn-sm btn-success btn-rounded" >
                                                    <i class="fa-solid fa-arrow-trend-up"></i>
                                                </NavLink>
                                                <NavLink to={"/dashboard/order/create/sale/" + o._id} className="btn btn-sm btn-danger btn-rounded" >
                                                    <i class="fa-solid fa-arrow-trend-down"></i>
                                                </NavLink>

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