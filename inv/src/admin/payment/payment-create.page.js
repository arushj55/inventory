import { postItem} from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { PaymentFormComponent } from "./payment-form.component";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

export function PaymentCreate(){
    let navigate = useNavigate();

    const addPayment = async (data) => {
        try {
            let response = await postItem('/payment',data,true)
            if(response.status){
                toast.success(response.msg);
                navigate('/dasboard/payment');
            }
        } catch(error) {
            toast.error("Error while adding data...");
        }
    }
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