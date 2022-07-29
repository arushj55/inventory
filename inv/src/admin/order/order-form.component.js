
import { useState, useEffect } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getItems } from "../../service/axios.service"
import Select from 'react-select'
import { useParams } from "react-router-dom";

let default_data = {
    bill_number: '',
    supplier: '',
    retailer: '',
    product: '',
    quantity: '',
    price: 0,
};

export function OrderFormComponent({ onHandleSubmit, order }) {
    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    let role = user.role;
    
    let [err, setErr] = useState(default_data);
    let [data, setData] = useState(order ?? default_data);
    let [price, setPrice] = useState();
    let [qty, setQuantity] = useState();
    let [supplier, setSupplier] = useState();
    let [retailer, setRetailer] = useState();
    let [product, setProduct] = useState();
    let [default_supplier, setDefaultSupplier] = useState();
    let [default_retailer, setDefaultRetailer] = useState();
    let [default_product, setDefaultProduct] = useState();
    let [validated, setValidated] = useState(false);
    let params = useParams();

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
        let { value, name, type } = ev.target;

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

            case "status":
                errMsg = value != "purchase" || value != 'sale' ? 'status is either sale or purchase' : '';
                break
            case "state":
                errMsg = value != "delivered" || value != 'pending' ? 'state is either delivered or pending' : '';
                break
            case "quantity":
                if (value > qty && data.status === 'sales') {
                    errMsg = "Quantity is higher than stock value"
                }
                if (value === '') {
                    errMsg = "Quantity is required"
                }
                if (value < 0) {
                    errMsg = "Invalid "
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
    const getAllSuppliers = async () => {
        let result = await getItems('/supplier/')
        let data = result.data.result.map((o) => ({
            label: o.name,
            value: o._id
        }))
        setSupplier(data);
    }

    const getAllReatilers = async () => {
        let result = await getItems('/user/')
        let datas = result.data.result.map((o) => ({
            label: o.full_name,
            value: o._id,
            role: o.role
        }))
        setRetailer(datas)
    }

    const getAllProducts = async () => {
        let result = await getItems('/product/')
        let products = result.data.result.map((o) => ({
            label: o.product_name,
            value: o._id,
            price: o.price_unit,
            quantity: o.quantity
        }))
        setProduct(products)
    }
    useEffect(() => {
        getAllSuppliers()
        getAllReatilers()
        getAllProducts()
        
    }, [])


    const handleSupplierChange = (selecteOption) => {
        setDefaultSupplier(selecteOption);
        setData((pre) => ({
            ...pre,
            supplier: selecteOption.value
        }))
    }

    const handleRetailerChange = (selecteOption) => {
        setDefaultRetailer(selecteOption);
        setData((pre) => ({
            ...pre,
            retailer: selecteOption.value
        }))
    }
    const handleProductChange = (selecteOption) => {
        setDefaultProduct(selecteOption);
        setData((pre) => ({
            ...pre,
            product: selecteOption.value
        }))
    }

    useEffect(() => {
        setPrice(default_product?.price)
        setQuantity(default_product?.quantity)
    }, [default_product])
   
    return (

        <>
            <Container>
                <Row className="mt-3">
                    <Col>
                        <h4 className="text-center">Order Page</h4>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col>

                        <Form noValidate validated={validated} onSubmit={submitForm} className="center">



                            {
                                role && role === "admin" 
                                    ?
                                    <>

                                        
                                        {params.id && params.status === "purchase" ? 
                                            <>
                                            <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom01">
                                                <Form.Label>Supplier</Form.Label>
                                                <Select
                                                    value={default_supplier}
                                                    onChange={handleSupplierChange}
                                                    options={supplier}

                                                />
                                            </Form.Group>
                                            </Row>
                                            </> : <></>}

                                            {params.id && params.status === "sale" ? 
                                            <> 
                                            <Row>
                                            <Form.Group as={Col} md="8" controlId="validationCustom02">
                                            <Form.Label>Retailer</Form.Label>
                                            <Select
                                                value={default_retailer}
                                                onChange={handleRetailerChange}
                                                options={retailer}
                                            />
                                        </Form.Group>
                                        </Row>
                                        </> : <></>}

                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom03">
                                                <Form.Label>product</Form.Label>
                                                <Select
                                                    value={default_product}
                                                    onChange={handleProductChange}
                                                    options={product}
                                                />
                                            </Form.Group>
                                        </Row>

                                        {params && params.status === "purchase" ? <>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom04">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="status"
                                                    onChange={handleChange}
                                                    defaultValue={params.status}
                                                    required

                                                />
                                                <Form.Control.Feedback type="invalid">{
                                                    err['status'] ?? 'Status is required'
                                                }</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        </> : <> 
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom04">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="status"
                                                    onChange={handleChange}
                                                    defaultValue={params.status}
                                                    required

                                                />
                                                <Form.Control.Feedback type="invalid">{
                                                    err['status'] ?? 'Status is required'
                                                }</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        </>}
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom05">
                                                <Form.Label>Quantity</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="quantity"
                                                    onChange={handleChange}
                                                    defaultValue={qty}
                                                    required

                                                />

                                            </Form.Group>
                                            <span className='text-danger'>
                                                {err.quantity}
                                            </span>
                                        </Row>


                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom06">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="price"
                                                    placeholder="price"
                                                    onChange={handleChange}
                                                    defaultValue={price}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid Address.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>




                                    </>
                                    :
                                    <>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom07">
                                                <Form.Label>State</Form.Label>
                                                <Form.Select
                                                    aria-label="State"
                                                    name="state"
                                                    onChange={handleChange}
                                                >
                                                    <option value="delivered" selected={order?.state == 'delivered' ? true : false}>Delivered</option>
                                                    <option value="pending" selected={order?.state == 'pending' ? true : false}>Pending</option>
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">{
                                                    err['state'] ?? 'State is required'
                                                }</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                    </>
                            }

                            <Button type="submit">Submit form</Button>
                        </Form>
                    </Col>
                </Row>


            </Container>
        </>)
}
