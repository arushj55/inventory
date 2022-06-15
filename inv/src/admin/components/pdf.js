import { jsPDF } from "jspdf";
import { getItems } from "../../service/axios.service";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
export function PdfGenerator() {
    let params = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        getItems('/order/' + params.id)
            .then((response) => {

                let address = (response.data.result.retailer.address)
                let name = (response.data.result.retailer.full_name)
                let product = (response.data.result.product.product_name)
                let id = (response.data.result.bill_number).toString();
                let phone = (response.data.result.retailer.phone).toString();
                let price = (response.data.result.price).toString();
                let total = (response.data.result.sub_total).toString();
                let qty = (response.data.result.quantity).toString();
                let date = (new Date(response.data.result.createdAt).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' }))

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

                doc.save("order.pdf");

                navigate(-1)

            })
            .catch((error) => {
                console.log(error)
                navigate(-1);
            })
    }, []);

}


