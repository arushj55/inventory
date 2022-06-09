import { postItem,uploader} from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { OrderFormComponent } from "./order-form.component";
import {toast} from "react-toastify";
import { useNavigate} from "react-router-dom";


export function OrderCreate(){
    let navigate = useNavigate();


    const addOrder = async (data) => {
        let quantity =0;
        try {
            let response = await postItem('/order',data,true)
            if(response.status){
                let response = await uploader('get', 'product/'+ data.product)
                let value=response.result
                if(data.status === 'purchase')
                {
                     quantity = Number(value.quantity)+Number(data.quantity);
                }
                    else{
                        quantity = Number(value.quantity)-Number(data.quantity);
                    }

                    console.log("here quantity",quantity)
                    let res = await uploader('put', 'product/'+ data.product,quantity)
                    {
                        console.log(res)
                        if(res.status){
                           console.log(res.msg)
                            navigate('/dashboard/order');
                        }
                    }
            }
        } catch(error) {
            console.log(error)
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