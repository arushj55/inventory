import { getItems, uploader } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { ProductFormComponent } from "./product-form.component";
import {toast} from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function ProductEdit(){
    let navigate = useNavigate();
    let params = useParams();
    let [product, setProduct] = useState();

    const editProduct = async (data, file) => {
        try {
            
            
            let response = await uploader('put', 'product/'+product._id, data, file, true)
            if(response.status){
                toast.success(response.msg);
                navigate('/admin/product');
            }
        } catch(error) {
            toast.error("Error while updating data...");
        }
    }

    useEffect(() => {
        getItems('/product/'+params.id)
        .then((response) => {
            setProduct(response.data.result);
        })
        .catch((error) => {
            toast.error(error.response.msg)
            navigate('/admin/product');
            // navigate(-1);
        })
    }, []);
    return (<>
        <AdminPageTitle 
            title="Product Update"
            bread_crumb="Product Update"
        />
        <ProductFormComponent 
            onHandleSubmit={editProduct}
            product={product}
        />
    </>);
}