import { postItem} from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { OrderFormComponent } from "./order-form.component";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

export function OrderCreate(){
    let navigate = useNavigate();

    const addOrder = async (data) => {
        try {
            let response = await postItem('/order',data,true)
            if(response.status){
                toast.success(response.msg);
                navigate('/dasboard/order');
            }
        } catch(error) {
            toast.error("Error while adding data...");
        }
    }
    return (<>
        <AdminPageTitle 
            title="Order Add"
            bread_crumb="Order Add"
        />
        <OrderFormComponent 
            onHandleSubmit={addOrder}
        />
    </>);
}