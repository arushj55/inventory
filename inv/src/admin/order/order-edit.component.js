/***
 * import { getItems, uploader } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { OrderFormComponent } from "./order-form.component";
import {toast} from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function OrderEdit(){
    let navigate = useNavigate();
    let params = useParams();
    let [order, setOrder] = useState();

    const editOrder = async (data) => {
        console.log(order._id)
        try {
            let response = await uploader('put', 'order/'+ order._id, data)
            if(response.status){
                toast.success(response.msg);
                
            }
        } catch(error) {
            console.log(error)
            toast.error("Error while updating data...");
        }
    }

    useEffect(() => {
        getItems('/order/'+params.id)
        .then((response) => {
            console.log(response.data.result)
            setOrder(response.data.result);
        })
        .catch((error) => {
            toast.error(error.response.msg)
            navigate('/dashboard/order');
        })
    }, []);

   
    return (<>
        <AdminPageTitle 
            title="Order Update"
            bread_crumb="Order Update"
        />
        <OrderFormComponent 
            onHandleSubmit={editOrder}
            order={order}
        />
    </>);
}
 */



import { getItems, uploader } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { OrderFormComponent } from "./order-form.component";
import {toast} from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function OrderEdit(){
    let navigate = useNavigate();
    let params = useParams();
    let [order, setOrder] = useState();

    const editOrder = async (data) => {

        try {
            let response = await uploader('put','supplier/'+order._id, data,true)
            if(response.status){
                toast.success(response.msg);
                navigate("/dashboard/transaction/create" + order._id);
            }
        } catch(error) {
            toast.error("Error while updating data...");
        }
    }

    useEffect(() => {
        getItems('/order/'+params.id)
        .then((response) => {
            
            setOrder(response.data.result);
        })
        .catch((error) => {
            toast.error(error.response.msg)
           // navigate('/dashboard');
             navigate(-1);
        })
    }, []);
    return (<>
        <AdminPageTitle 
            title="Order Update"
            bread_crumb="Order Update"
        />
        <OrderFormComponent 
            onHandleSubmit={editOrder}
           order={order}
        />
    </>);
}