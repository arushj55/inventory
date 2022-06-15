
import {  useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap";

let default_data = {
    bill_number:'',
    cheque_number:'',
    paid_by:'',
    total_amount:'',
    paid_amount: '',
    due_amount:''
};

export function PaymentFormComponent({ onHandleSubmit, payment }) {
    let [err, setErr] = useState(default_data);
    let [data, setData] = useState();
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

    const handleChange = (ev) => {
        let { value, name,type} = ev.target;
       
        setData((pre) => {
            return {
                ...pre,
                [name]: value
            }

        });
        validateData(name);
    }
    const validateData = (field) => {
        let errMsg = '';
        switch (field) {
            case "paid_amount":
                
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
                              <Form.Control.Feedback type="invalid" >{err.paid_amount}</Form.Control.Feedback>
                          </Form.Group>
                      </Row>


                          <Button type="submit">Submit form</Button>
                      </Form>
                  </Col>
              </Row>

              
          </Container>
    </>)
}