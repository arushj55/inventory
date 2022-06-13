import { useState,useEffect } from "react";
import { getItems } from "../../service/axios.service";
import "../../pages/map.css"
export function ContactTable(){
    const [data, setData] = useState([]);

    const getAllContacts = async () => {
        try {
            let result = await getItems('/contact/')
            if(result.data.result){
                setData(result.data.result)
            }
        } catch(error) {
            console.log(error);
        }
    }
    useEffect( () => {
        getAllContacts()
    }, []);
    return(<>
<table className="table table-hover table-bordered table-sm">
<thead className="table-dark">
<tr>
        <th>S.N</th>
        <th>Email</th>
        <th>Message</th>
        <th>Date</th>
    </tr>
</thead>
<tbody>
    {data && data.map((o,i) => (
        <tr key={i}>
            <td style={{color:"White"}}>{i+1}</td>
            <td style={{color:"White"}}>{o.email}</td>
            <td style={{color:"White"}}>{o.message}</td>
            <td style={{color:"White"}}>{new Date(o.createdAt).toLocaleString('default', { month: 'long' })}
            </td>
        </tr>
    ))}
</tbody>
</table>
</>
    )
    }