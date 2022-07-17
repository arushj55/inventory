import { useState,useEffect } from "react";
import { getItems } from "../../service/axios.service";
import "../../pages/map.css"
export function OTable(){
    const [data, setData] = useState([]);
    const getAllOrders = async () => {
        try {
            let result = await getItems('/order/')
            if (result.data.result) {
                setData(result.data.result)
            }
        } catch (error) {
           console.log(error)
        }
    }
    useEffect(() => {
        getAllOrders()
    }, []);
    return (<>
        
                <table className="table table-hover table-bordered table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>S.N</th>
                            <th>Bill Number</th>
                            <th>Supplier</th>
                            <th>Retailer</th>
                            <th>Product</th>
                            <th>Status</th>
                            <td>State</td>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((o, i) => (
                            <tr key={i}>
                                <td style={{color:"White"}}>{i + 1}</td>
                                <td style={{color:"White"}}>{o.bill_number}</td>
                                <td style={{color:"White"}}>{o.supplier?.name}</td>
                                <td style={{color:"White"}}>{o.retailer?.full_name}</td>
                                <td style={{color:"White"}}>{o.product?.product_name}</td>
                                <td style={{color:"White"}}>{o?.status}</td>
                                <td style={{color:"White"}}>{o?.state}</td>
                                <td style={{color:"White"}}>{o.quantity}</td>
                                <td style={{color:"White"}}>{o.price}</td>
                                <td style={{color:"White"}}>{o.sub_total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

    </>)
    }
