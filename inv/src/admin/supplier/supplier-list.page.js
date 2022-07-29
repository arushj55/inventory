import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { toast } from "react-toastify";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox-plus-jquery.js"
import { NavLink } from "react-router-dom";


export function SupplierList() {
    const [data, setData] = useState([]);

    const getAllSuppliers = async () => {
        try {
            let result = await getItems('/supplier/')
            if (result.data.result) {
                setData(result.data.result)
            }
        } catch (error) {
            // error handle
            toast.error("Error while fetching supplier data");
        }
    }
    useEffect(() => {
        getAllSuppliers()
    }, []);

    const onDelete = (id) => {
        deleteItem('/supplier/' + id, true)
            .then((res) => {
                if (res.data.status) {
                    toast.success(res.data.msg);
                    getAllSuppliers()
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
            title="Supplier"
            bread_crumb="Supplier List"
            add_link="/dashboard/supplier/create"
        />

        <div className="card mb-4">
            <div className="card-body">
                <table className="table table-hover table-bordered table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((o, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{o.name}</td>
                                <td>{o.email}</td>
                                <td>{o.address}</td>
                                <td>{o.phone}</td>

                                <td>
                                    <NavLink to={"/dashboard/supplier/" + o._id} className="btn btn-sm btn-success btn-rounded" >
                                        <i className="fa fa-pen"></i>
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    </>)
}