import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import {toast} from "react-toastify";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox-plus-jquery.js"
import { ActionButton } from "../../component/action-button/action-button.component";

export function ProductList(){
    const [data, setData] = useState([]);

    const getAllProducts = async () => {
        try {
            let result = await getItems('/product/')
            if(result.data.result){
                setData(result.data.result)
            }
        } catch(error) {
            // error handle
            toast.error("Error while fetching product data");
        }
    }
    useEffect( () => {
        getAllProducts()
    }, []);

    const onDelete = (id) => {
        deleteItem('/product/'+id, true)
        .then((res) => {
            if(res.data.status) {
                toast.success(res.data.msg);
                getAllProducts()
            } else {
                toast.error(res.data.msg);
            }
        })
        .catch((error) => {
            toast.error(error);
        })
    }
    console.log()
    return (<>
        <AdminPageTitle
            title="Product"
            bread_crumb="Product List"
            add_link="/dashboard/product/create"
        />

        <div className="card mb-4">
            <div className="card-body">
                <table className="table table-hover table-bordered table-sm">
                    <thead className="table-dark">
                    <tr>
                            <th>S.N</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Supplier</th>
                            <th>Create At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((o,i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{o.product_name}</td>
                                <td>{o.price_unit}</td>
                                <td>{o.quantity}</td>
                                <td>{o.supplier?.name}</td>
                                <td>{new Date(o.createdAt).toLocaleString('default', { month: 'long' })}
                                </td>
                                <td>
                                    <ActionButton
                                        editLink={"/dashboard/product/"+o._id}
                                        id={o._id}
                                        onDelete={onDelete}
                                    />
                                </td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    
    </>)
}