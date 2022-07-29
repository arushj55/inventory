import { useEffect, useState } from "react";
import { getItems } from "../../service/axios.service";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox-plus-jquery.js"

export function List(){
    const [data, setData] = useState([]);
    

    const getAllPayments = async () => {
        try {
            let result = await getItems('/payment/')
            if(result.data.result){
                setData(result.data.result)
            }
        } catch(error) {
            // error handle
            console.log(error);
        }
    }
    useEffect( () => {
        getAllPayments()
    }, []);

    return (<>
    
        <div className="card mb-4">
            <div className="card-body">
                <table className="table table-hover table-bordered table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>S.N</th>
                            <th>Bill Number</th>
                            <th>Retailer</th>
                            <th>Contact Number</th>
                            <th>Total Amount</th>
                            <th>Paid Amount</th>
                            <th>Due Amount</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((o,i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                               <td>{o?.bill_number}</td>
                               <td>{o?.paid_by}</td>
                               <td>{o?.contact}</td>
                                <td>{o?.amount}</td>
                                <td>{o?.paid_amount}</td>
                                <td>{o?.due_amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    
    </>)
}