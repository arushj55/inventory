
import {  useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap";

let default_data = {
    username: '',
    password: '',
    full_name: '',
    email: '',
    address: '',
    phone: '',
};

export function UserFormComponent({ onHandleSubmit, user }) {
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
            case "role":
                errMsg = data['role'] !== "staff" || data['role'] !== 'retailer' ? 'Role is either retailer or staff' : '';
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
                      <h4 className="text-center">Register Page</h4>
                  </Col>
              </Row>
              <hr></hr>
              <Row>
                  <Col>
                      
                  <Form noValidate validated={validated} onSubmit={submitForm} className="center">
                      
                          
                          {!user ? <>
                            <Row className="mb-3">
                          <Form.Group as={Col} md="8" controlId="validationCustom01">
                              <Form.Label>Username</Form.Label>
                              <Form.Control
                                  size="sm"
                                  name="username"
                                  onChange={handleChange}
                                  required
                                  type="text"
                                  placeholder="Username"
                                  defaultValue=""
                              />
                              <Form.Control.Feedback type="invalid">UserName is required</Form.Control.Feedback>
                          </Form.Group>
                          </Row>

                          
                        <Row className="mb-3">
                      <Form.Group as={Col} md="4" controlId="validationCustom02">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                  size="sm"
                                  name="password"
                                  required
                                  onChange={handleChange}
                                  type="password"
                                  placeholder="password"
                                  defaultValue=''
                              />
                              <Form.Control.Feedback type="invalid" >Password is required</Form.Control.Feedback>
                          </Form.Group>

                        
                          <Form.Group as={Col} md="4" controlId="validationCustom03">
                              <Form.Label>Confirm-Password</Form.Label>
                              <Form.Control
                                  size="sm"
                                  required
                                  name="confirm-password"
                                  type="password"
                                  onChange={handleChange}
                                  placeholder="password"
                                  defaultValue=""
                              />
                              <Form.Control.Feedback type="invalid">Confirm Password does not match.</Form.Control.Feedback>
                          </Form.Group>
                    

                        
                            </Row>
                            </> :<></> }
                      
                            <Row className="mb-3">
                      <Form.Group as={Col} md="8" controlId="validationCustom04">
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control
                                  size="sm"
                                  required
                                  name="full_name"
                                  type="text"
                                  onChange={handleChange}
                                  placeholder="Full Name"
                                  defaultValue={user?.full_name}
                              />
                              <Form.Control.Feedback type="invalid" >Full Name is required</Form.Control.Feedback>
                          </Form.Group>
                            </Row>
                          <Row className="mb-3">
                          <Form.Group as={Col} md="8" controlId="validationCustom05">
                          <Form.Label>Email</Form.Label>
                              <Form.Control 
                                  type="text" 
                                  name="email" 
                                  placeholder="Email" 
                                  onChange={handleChange}
                                  required
                                  defaultValue={user?.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                  Please provide a valid Email.
                              </Form.Control.Feedback>
                          </Form.Group>
                      </Row>

                      <Row className="mb-3">
                          <Form.Group as={Col} md="8" controlId="validationCustom06">
                              <Form.Label>Role</Form.Label>
                                  <Form.Select
                                      aria-label="Role" 
                                      name="role"
                                      onChange={handleChange}
                                  >
                                      <option value="staff" selected={user?.role === 'staff' ? true : false}>Staff</option>
                                      <option value="retailer" selected={user?.role === 'retailer' ? true : false}>Retailer</option>
                                  </Form.Select>
                              <Form.Control.Feedback type="invalid">{
                                  err['role'] ?? 'Role is required'
                              }</Form.Control.Feedback>
                          </Form.Group>
                      </Row>


                      <Row className="mb-3">
                          <Form.Group as={Col} md="8" controlId="validationCustom07">
                          <Form.Label>Address</Form.Label>
                              <Form.Control 
                                  type="text" 
                                  name="address" 
                                  placeholder="City" 
                                  onChange={handleChange}
                                  required 
                                  defaultValue={user?.address}
                              />
                              <Form.Control.Feedback type="invalid">
                                  Please provide a valid Address.
                              </Form.Control.Feedback>
                          </Form.Group>
                      </Row>
                        
                      <Row className="mb-3">
                          <Form.Group as={Col} md="8" controlId="validationCustom08">
                          <Form.Label>Mobile Number</Form.Label>
                              <Form.Control 
                                  type="number" 
                                  name="phone"
                                  placeholder="Number" 
                                  required 
                                  onChange={handleChange}
                                  defaultValue={user?.phone}
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