import { postItem, uploader } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { OrderFormComponent } from "./order-form.component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export function OrderCreate() {
    let navigate = useNavigate();


    const addOrder = async (data) => {
         try {
            let response = await postItem('/order', data, true)
            if (response.status) {
                uploader('get', 'product/' + data.product)
                    .then((res) => {
                        if (data.status === 'purchase') {
                           res.result.quantity = Number(res.result.quantity) + Number(data.quantity);
                        }
                        else {
                            res.result.quantity = Number(res.result.quantity) - Number(data.quantity);
                        }

                        res.result.supplier = res.result.supplier._id
                        

                         uploader('put','product/'+data.product,res.result)
                            .then((succ)=>{
                                toast.success("Order Created Successfully....")
                                navigate('/dashboard/product')
                            })

                    })


            }
        } catch (error) {
            console.log(error);
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