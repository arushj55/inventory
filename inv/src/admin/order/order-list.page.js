import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import {toast} from "react-toastify";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox-plus-jquery.js"
import { ActionButton } from "../../component/action-button/action-button.component";


export function OrderList(){
    const [data, setData] = useState([]);
    const getAllOrders = async () => {
        try {
            let result = await getItems('/order/')
            if(result.data.result){
                setData(result.data.result)
            }
        } catch(error) {
            // error handle
            toast.error("Error while fetching order data");
        }
    }
    useEffect( () => {
        getAllOrders()
    }, []);

    const onDelete = (id) => {
        deleteItem('/order/'+id, true)
        .then((res) => {
            if(res.data.status) {
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
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((o,i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{o.full_name}</td>
                                <td>{o.email}</td>
                                <td>{o.address}</td>
                                <td>{o.role}</td>
                                <td>{o.phone}</td>

                                <td>
                                    <ActionButton
                                        editLink={"/dashboard/order/"+o._id}
                                        id={o._id}
                                        onDelete={onDelete}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    
    </>)
}