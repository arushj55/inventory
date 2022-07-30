import React from 'react';
import { getItems } from '../../service/axios.service';
import { useState,useEffect } from 'react';
import BootStrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
 export function    PaymentTable() {

  let user = JSON.parse(localStorage.getItem('reactuser_user'));

  const [data, setData] = useState([]);
  const columns = [
    {dataField:'bill_number', text:"Bill Number"},
    {dataField:'cheque_number', text:"Cheque Number", sort:true},
    {dataField:'paid_amount', text:"Amount"},
    {dataField:'due_amount', text:"Due Amount"}
   
  ]

  let d=[];
    const getAllOrders = async () => {
      try {
          let result = await getItems('/payment/')
          for (let i = 0; i < result.data.result.length; i++) {
            if (result.data.result[i].paid_by === user.name) {
                d.push((result.data.result[i]));
            }
           setData(d);
            
        }
        
      } catch (error) {
          // error handle
          console.log(error);
      }
  }

  
 
  useEffect(() => {
      getAllOrders()
  },[user]);
  return(
    <>
        <BootStrapTable keyField='_id' columns={columns} data={data}/>
    </>
  )
}