
import {  useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap";

let default_data = {
    name: '',
    email: '',
    address: '',
    phone: '',
};

export function SupplierFormComponent({ onHandleSubmit, supplier }) {
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
        let { value, name} = ev.target;
       
        setData((pre) => {
            console.log("pre",pre);
            return {
                ...pre,
                [name]: value
            }

        });
        validateData(name);
    }

    const validateData = (field) => {
        let errMsg = '';

        setErr((pre) => {

            return {
                ...pre,
                [field]: errMsg
            }
        })
        setValidated(true);
    }
            console.log("supplier",supplier)
    return (<>
        <Container>
              <Row className="mt-3">
                  <Col>
                      <h4 className="text-center">Register Page</h4>
                  </Col>
              </Row>
              <hr></hr>
              <Row>
                  <Col>
                      
                  <Form noValidate validated={validated} onSubmit={submitForm}>
                      <Row className="mb-3">
                          <Form.Group as={Col} md="8" controlId="validationCustom01">
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control
                                  size="sm"
                                  required
                                  name="name"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder="Full Name"
                                  defaultValue={supplier?.name}
                              />
                              <Form.Control.Feedback type="invalid" >Full Name is required</Form.Control.Feedback>
                          </Form.Group>
                      </Row>

                      <Row className="mb-3">
                          <Form.Group as={Col} md="8" controlId="validationCustom02">
                          <Form.Label>Email</Form.Label>
                              <Form.Control 
                                  type="text" 
                                  name="email" 
                                  placeholder="Email" 
                                  onChange={handleChange}
                                  required 
                                  defaultValue={supplier?.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                  Please provide a valid Email.
                              </Form.Control.Feedback>
                          </Form.Group>
                      </Row>


                      <Row className="mb-3">
                          <Form.Group as={Col} md="8" controlId="validationCustom03">
                          <Form.Label>Address</Form.Label>
                              <Form.Control 
                                  type="text" 
                                  name="address" 
                                  placeholder="City" 
                                  onChange={handleChange}
                                  required 
                                  defaultValue={supplier?.address}
                              />
                              <Form.Control.Feedback type="invalid">
                                  Please provide a valid Address.
                              </Form.Control.Feedback>
                          </Form.Group>
                      </Row>
                        
                      <Row className="mb-3">
                          <Form.Group as={Col} md="8" controlId="validationCustom04">
                          <Form.Label>Mobile Number</Form.Label>
                              <Form.Control 
                                  type="number" 
                                  name="phone"
                                  placeholder="Number" 
                                  required 
                                  onChange={handleChange}
                                  defaultValue={supplier?.phone}
                              />
                              <Form.Control.Feedback type="invalid">
                                  Please provide a valid Number.
                              </Form.Control.Feedback>
                          </Form.Group>
                      </Row>

                          <Button type="submit">Submit form</Button>
                      </Form>
                  </Col>
              </Row>

              
          </Container>
    </>)
}