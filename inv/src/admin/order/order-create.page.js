import { postItem, uploader,getItems} from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { OrderFormComponent } from "./order-form.component";
import { useNavigate, useParams} from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export function OrderCreate() {
    let navigate = useNavigate();
    let params = useParams();
    let [product, setProduct] = useState()
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
console.log(params.id)
    useEffect(() => {
        getItems('/product/'+params.id)
        .then((res) => {
            console.log(res)
            let pro =({
                label: res.data.result.supplier.name,
                value: res.data.result.supplier._id
            })
            setProduct(pro)
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.response.msg)
           // navigate('/dashboard');
             navigate(-1);
        })
    }, []);


    return (<>
        <AdminPageTitle
            title="Order"
            bread_crumb="Order"
        />
        <OrderFormComponent
            onHandleSubmit={addOrder}
            order={product}
        />
    </>);
}