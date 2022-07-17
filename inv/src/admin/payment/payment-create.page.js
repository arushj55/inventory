import { useState,useEffect } from "react";
import { postItem, getItems} from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { PaymentFormComponent } from "./payment-form.component";
import { useNavigate , useParams} from "react-router-dom";

export function PaymentCreate(){
    let navigate = useNavigate();
    let params = useParams();
    let [order, setOrder] = useState();

    const addPayment = async (data) => {
        data.bill_number = order.bill_number;
        data.total_amount = order.sub_total;
        data.paid_by = order.retailer.email;
        try {
            let response = await postItem('/payment',data,true)
            if(response.status){
                console.log(response.msg);
                navigate('/dashboard/transaction');
            }
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getItems('/order/'+params.id)
        .then((response) => {
            setOrder(response.data.result);
        })
        .catch((error) => {
            console.log(error.response.msg)
            navigate('/dashboard/order');
        })
    }, []);
    return (<>
        <AdminPageTitle 
            title="Payment Add"
            bread_crumb="Payment Add"
        />
        <PaymentFormComponent 
            onHandleSubmit={addPayment}
        />
    </>);
}