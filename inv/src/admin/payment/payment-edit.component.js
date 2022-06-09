import { getItems, uploader } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { PaymentFormComponent } from "./payment-form.component";
import {toast} from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function PaymentEdit(){
    let navigate = useNavigate();
    let params = useParams();
    let [payment, setPayment] = useState();

    const editPayment = async (data, file) => {
        try {
            let response = await uploader('put', 'payment/'+ payment._id, data, file)
            if(response.status){
                toast.success(response.msg);
                navigate('/dashboard/payment');
            }
        } catch(error) {
            toast.error("Error while updating data...");
        }
    }

    useEffect(() => {
        getItems('/payment/'+params.id)
        .then((response) => {
            setPayment(response.data.result);
        })
        .catch((error) => {
            toast.error(error.response.msg)
            navigate('/dashboard/payment');
            // navigate(-1);
        })
    }, []);
    return (<>
        <AdminPageTitle 
            title="Payment Update"
            bread_crumb="Payment Update"
        />
        <PaymentFormComponent 
            onHandleSubmit={editPayment}
            payment={payment}
        />
    </>);
}