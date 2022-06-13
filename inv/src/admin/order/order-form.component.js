
import { useState, useEffect } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getItems } from "../../service/axios.service"
import Select from 'react-select'


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
    let [data, setData] = useState();
    let [price, setPrice] = useState();
    let [supplier, setSupplier] = useState();
    let [retailer, setRetailer] = useState();
    let [product, setProduct] = useState();
    let [default_supplier, setDefaultSupplier] = useState();
    let [default_retailer, setDefaultRetailer] = useState();
    let [default_product, setDefaultProduct] = useState();
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
        let { value, name, type } = ev.target;

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
            case "status":
                errMsg = data['status'] != "purchase" || data['status'] != 'sale' ? 'status is either sale or purchase' : '';
                break
            case "state":
                errMsg = data['state'] != "delivered" || data['state'] != 'pending' ? 'state is either delivered or pending' : '';
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
            price: o.price_unit
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
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom01">
                                                <Form.Label>Bill Number</Form.Label>
                                                <Form.Control
                                                    size="sm"
                                                    name="bill_number"
                                                    onChange={handleChange}
                                                    required
                                                    type="number"
                                                    placeholder="Bill Number"

                                                />
                                                <Form.Control.Feedback type="invalid">Order Number is required</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                                <Form.Label>Supplier</Form.Label>
                                                <Select
                                                    value={default_supplier}
                                                    onChange={handleSupplierChange}
                                                    options={supplier}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" controlId="validationCustom03">
                                                <Form.Label>Retailer</Form.Label>
                                                <Select
                                                    value={default_retailer}
                                                    onChange={handleRetailerChange}
                                                    options={retailer}
                                                />
                                            </Form.Group>

                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom05">
                                                <Form.Label>product</Form.Label>
                                                <Select
                                                    value={default_product}
                                                    onChange={handleProductChange}
                                                    options={product}
                                                />
                                            </Form.Group>
                                        </Row>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom06">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Select
                                                    aria-label="Status"
                                                    name="status"
                                                    onChange={handleChange}
                                                >
                                                    <option value="purchase" selected={order?.role == 'purchase' ? true : false}>Purchase</option>
                                                    <option value="sale" selected={order?.role == 'sale' ? true : false}>Sale</option>
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">{
                                                    err['status'] ?? 'Status is required'
                                                }</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom06">
                                                <Form.Label>Quantity</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="quantity"
                                                    placeholder="number"
                                                    onChange={handleChange}
                                                    required

                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid quantity
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>


                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="8" controlId="validationCustom07">
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
                                            <Form.Group as={Col} md="8" controlId="validationCustom06">
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
