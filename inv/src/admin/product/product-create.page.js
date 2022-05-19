import { uploader } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { ProductFormComponent } from "./product-form.component";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

export function ProductCreate(){
    let navigate = useNavigate();

    const addProduct = async (data, file) => {
        try {
            
            let response = await uploader('post', 'product', data, file, true)
            if(response.status){
                toast.success(response.msg);
                navigate('/admin/product');
            }
        } catch(error) {
            toast.error("Error while adding data...");
        }
    }
    return (<>
        <AdminPageTitle 
            title="Product Add"
            bread_crumb="Product Add"
        />
        <ProductFormComponent 
            onHandleSubmit={addProduct}
        />
    </>);
}