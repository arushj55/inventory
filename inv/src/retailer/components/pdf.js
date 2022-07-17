import { jsPDF } from "jspdf";
import { getItems } from "../../service/axios.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export function Generator() {
    let user = JSON.parse(localStorage.getItem('reactuser_user'));

    let navigate = useNavigate()
    let d=0;
    getItems('/payment/')
        .then((res) => {
            let data = res.data.result;
            let count = res.data.result.length;
            for (let i = 0; i < count; i++) {
                if (data[i].paid_by === user.email) {
                    d = d + data[i].paid_amount;
                   
                }
            }
            console.log(d)
            const doc = new jsPDF();
            doc.setFontSize(22);
            doc.text("Order Receipt = "+ d.toString(), 80, 10);
            doc.save("report.pdf");


        })
        .catch((err) => {
            console.log(err);
        })

        
       

    /*
    useEffect(() => {
        console.log(data)
        
                let address = (data.retailer.address)
                let name = (data.retailer.full_name)
                let product = (data.product.product_name)
                let id = (data.bill_number).toString();
                let phone = (data.retailer.phone).toString();
                let price = (data.price).toString();
                let total = (data.sub_total).toString();
                let qty = (data.quantity).toString();
                let date = (new Date().toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' }))

                const doc = new jsPDF();
                doc.setFontSize(22);
                doc.text("Order Receipt ", 80, 10);
                doc.text("Date : " + date, 120, 20)
                doc.text("Bill number : " + id, 10, 30);
                doc.text("Product : " + product, 10, 50);
                doc.text("Name : " + name, 10, 70);
                doc.text("Address : " + address, 10, 90);
                doc.text("Phone : " + phone, 10, 110);
                doc.text("Price : " + price, 10, 130);
                doc.text("Quantity : " + qty, 10, 150);


                doc.text("Total: " + total, 150, 170);

                doc.setLineWidth(0.1);
                doc.setDrawColor(0, 0, 0);
                doc.setLineDash([3]);
                doc.line(10, 160, 200, 160);

                doc.save("report.pdf");

                navigate("/retailer")

          
    }, []);
    */

}


