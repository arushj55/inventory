import React from 'react';
import { getItems } from '../../service/axios.service';
import { useState,useEffect } from 'react';
import BootStrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
 export function InitialOrder() {

  let user = JSON.parse(localStorage.getItem('reactuser_user'));

  const [data, setData] = useState([]);
  const columns = [
    {dataField:'bill_number', text:"Bill Number"},
    {dataField:'product.product_name', text:"Product", sort:true},
    {dataField:'quantity', text:"Quantity"},
    {dataField:'price', text:"Price"},
    {dataField:'sub_total', text:"Total"}
   
  ]

  let d=[];
    const getAllOrders = async () => {
      try {
          let result = await getItems('/order/')
          for (let i = 0; i < result.data.result.length; i++) {
            if (result.data.result[i].retailer.email ===  user.email) {
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
  },[]);
  return(
    <>
        <BootStrapTable keyField='_id' columns={columns} data={data} />
    </>
  )
}