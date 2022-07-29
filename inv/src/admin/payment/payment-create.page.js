import { useState,useEffect } from "react";
import { postItem, getItems} from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { PaymentFormComponent } from "./payment-form.component";
import { useNavigate , useParams} from "react-router-dom";
import { toast } from "react-toastify";

export function PaymentCreate(){
    let navigate = useNavigate();
    let params = useParams();
    let [order, setOrder] = useState();

   
    const addPayment = async (data) => {
        data.bill_number = order.bill_number;
        data.amount = order.sub_total;
        data.total_amount = order.sub_total;
        data.paid_by = order.retailer.full_name;
        data.contact = order.retailer.phone;
          try {
            let response = await postItem('/payment',data,true)
            if(response.status){
                toast.success(response.msg);
                navigate('/dashboard');
            }
        } catch(error) {
            toast.error(error.msg)
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
            id={params.id}
        />
    </>);
}