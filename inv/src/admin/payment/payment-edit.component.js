import { getItems, uploader } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { PaymentFormComponent } from "./payment-form.component";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function PaymentEdit(){
    let navigate = useNavigate();
    let params = useParams();
    let [payment, setPayment] = useState();
   
    const editPayment = async (data) => {
        data.paid_amount = Number(data.paid_amount)+Number(payment.paid_amount);
        data.due_amount = Number(payment.total_amount)- Number(data.paid_amount);
        console.log(data.due_amount)
        try {
            let response = await uploader('put', 'payment/'+ payment._id, data)
            if(response.status){
               console.log(response.msg);
                navigate('/dashboard/Transaction');
            }
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getItems('/payment/'+params.id)
        .then((response) => {
            setPayment(response.data.result);
        })
        .catch((error) => {
            console.log(error.response.msg)
            navigate(-1);
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