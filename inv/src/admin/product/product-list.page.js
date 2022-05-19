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

    const order = () =>{
        <>
        <p>here</p>
        </>
    }
    return (<>
        <AdminPageTitle
            title="Product"
            bread_crumb="Product List"
            add_link="/admin/product/create"
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
                            <th>Action</th>
                            <th>Order</th>
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
                                <td>
                                    <ActionButton
                                        editLink={"/admin/product/"+o._id}
                                        id={o._id}
                                        onDelete={onDelete}
                                    />
                                </td>
                                <td>
                                <button type="button" class="btn btn-light" onClick={order}><i className="fas fa-shopping-cart"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    
    </>)
}