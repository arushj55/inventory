import { postItem} from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { SupplierFormComponent } from "./supplier-form.component";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

export function SupplierCreate(){
    let navigate = useNavigate();

    const addSupplier = async (data) => {
        try {
            let response = await postItem('/supplier',data,true)
            if(response.status){
                toast.success(response.msg);
                navigate('/admin/supplier');
            }
        } catch(error) {
            toast.error("Error while adding data...");
        }
    }
    return (<>
        <AdminPageTitle 
            title="Supplier Add"
            bread_crumb="Supplier Add"
        />
        <SupplierFormComponent 
            onHandleSubmit={addSupplier}
        />
    </>);
}