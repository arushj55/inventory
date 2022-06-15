import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import {toast} from "react-toastify";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox-plus-jquery.js"
import { ActionButton } from "../../component/action-button/action-button.component";

import { useNavigate } from "react-router-dom";

export function PaymentList(){
    const [data, setData] = useState([]);
    let navigate = useNavigate();

    const getAllPayments = async () => {
        try {
            let result = await getItems('/payment/')
            if(result.data.result){
                setData(result.data.result)
            }
        } catch(error) {
            // error handle
            toast.error("Error while fetching payment data");
        }
    }
    useEffect( () => {
        getAllPayments()
    }, []);

    const onDelete = (id) => {
        deleteItem('/payment/'+id, true)
        .then((res) => {
            if(res.data.status) {
                toast.success(res.data.msg);
                getAllPayments()
            } else {
                toast.error(res.data.msg);
            }
        })
        .catch((error) => {
            toast.error(error);
        })
    }

    console.log(data)
    return (<>
        <AdminPageTitle
            title="Payment"
            bread_crumb="Payment List"
           
        />

        <div className="card mb-4">
            <div className="card-body">
                <table className="table table-hover table-bordered table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>S.N</th>
                            <th>Bill Number</th>
                            <th>Cheque Number</th>
                            <th>Total Amount</th>
                            <th>Paid Amount</th>
                            <th>Due Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((o,i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{o.bill_number}</td>
                                <td>{o.cheque_number}</td>
                                <td>{o.total_amount}</td>
                                <td>{o.paid_amount}</td>
                                <td>{o.due_amount}</td>

                                <td>
                                    <ActionButton
                                        editLink={"/dashboard/Transaction/"+o._id}
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