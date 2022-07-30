
import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getItems } from "../../service/axios.service";

let default_data = {
    bill_number: '',
    cheque_number: '',
    paid_by: '',
    total_amount: '',
    paid_amount: '',
    due_amount: ''
};

export function PaymentFormComponent({ onHandleSubmit, payment, id }) {
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    let role = user.role;
    
    let [err, setErr] = useState(default_data);
    let [data, setData] = useState();
    let [amount, setAmount] = useState();
    let [validated, setValidated] = useState(false);




    const submitForm = (event) => {
        const form = event.currentTarget;
        event.preventDefault();


        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {

            onHandleSubmit(data);
        }


    }

    getItems("/order/" + id)
        .then((suc) => {
            setAmount(suc.data.result.sub_total)
        })
        .catch((err) => {
            console.log(err);
        })

    const handleChange = (ev) => {
        let { value, name } = ev.target;

        setData((pre) => {
            return {
                ...pre,
                [name]: value
            }

        });
        validateData(name, value);
    }
    const validateData = (field, value) => {
       
        let errMsg = '';
        switch (field) {
            case "paid_amount":
                if (value < 0) {
                    errMsg = "invalid"
                    break;
                }
                if (value > amount) {
                    errMsg = "Amount is higher then total value"
                }
                if (value === '') {
                    errMsg = "Amount is required"
                }
                break
        }

        setErr((pre) => {

            return {
                ...pre,
                [field]: errMsg
            }
        })
        setValidated(true);
    }

    console.log(payment)

    return (

        <>
            <Container>
                <Row className="mt-3">
                    <Col>
                        <h4 className="text-center">Payment Page</h4>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col>

                        <Form noValidate validated={validated} onSubmit={submitForm} className="center">
                            <Row className="mb-3">
                                <Form.Group as={Col} md="4" controlId="validationCustom01">
                                    <Form.Label>Paid Amount</Form.Label>
                                    <Form.Control
                                        size="sm"
                                        name="paid_amount"
                                        required
                                        onChange={handleChange}
                                        type="number"
                                        placeholder="Amount"
                                        defaultValue=""
                                    />
                                    <span className='text-danger'>
                                        {err.paid_amount}
                                    </span>
                                </Form.Group>
                            </Row>

                                {role && role === 'admin' ? 
                                <>
                                 <Row className="mb-3">
                                <Form.Group as={Col} md="8" controlId="validationCustom07">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select
                                        aria-label="State"
                                        name="state"
                                        onChange={handleChange}
                                    >
                                        <option value="delivered" selected={payment?.state == 'delivered' ? true : false}>Delivered</option>
                                        <option value="pending" selected={payment?.state == 'pending' ? true : false}>Pending</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">{
                                        err['state'] ?? 'State is required'
                                    }</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                                </>    
                                :
                                <></>
                            
                            }

                           


                            <Button type="submit">Submit form</Button>
                        </Form>
                    </Col>
                </Row>


            </Container>
        </>)
}