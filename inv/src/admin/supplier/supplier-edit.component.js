import { getItems, uploader } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { SupplierFormComponent } from "./supplier-form.component";
import {toast} from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function SupplierEdit(){
    let navigate = useNavigate();
    let params = useParams();
    let [supplier, setSupplier] = useState();

    const editSupplier = async (data) => {
        console.log("aako data",data);
        try {
            let response = await uploader('put','supplier/'+supplier._id, data,true)
            if(response.status){
                toast.success(response.msg);
                navigate('/admin/supplier');
            }
        } catch(error) {
            toast.error("Error while updating data...");
        }
    }

    useEffect(() => {
        getItems('/supplier/'+params.id)
        .then((response) => {
            
            setSupplier(response.data.result);
        })
        .catch((error) => {
            toast.error(error.response.msg)
            navigate('/admin/supplier');
            // navigate(-1);
        })
    }, []);
    return (<>
        <AdminPageTitle 
            title="Supplier Update"
            bread_crumb="Supplier Update"
        />
        <SupplierFormComponent 
            onHandleSubmit={editSupplier}
            supplier={supplier}
        />
    </>);
}