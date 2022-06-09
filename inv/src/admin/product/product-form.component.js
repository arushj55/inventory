import { useEffect, useState } from "react"
import { getItems } from "../../service/axios.service";
import Select from 'react-select'
let default_data = {
    product_name: '',
    description: '',
    price_unit: null,
    quantity:null,
    suuplier:'',
};
export function ProductFormComponent({ onHandleSubmit, product }) {
    let [err, setErr] = useState(default_data);
    let [data, setData] = useState(default_data);


    let [default_supplier, setDefaultSupplier] = useState();
    
    let [supplier, setSupplier] = useState();

    let user = JSON.parse(localStorage.getItem('reactuser_user'));
    let role = user.role;

    const handleChange = (ev) => {
        let { name, type, value, files } = ev.target;
    
        setData((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        onHandleSubmit(data);
    }

    const getAllSuppliers = async () =>{
        let result = await getItems('/supplier/')
        let data = result.data.result.map((o) => ({
            label: o.name,
            value: o._id
        }))
        setSupplier(data);
    }
    

    useEffect(() => {
        getAllSuppliers()
        setData(product);
    }, [product])



    const handleSupplierChange = (selecteOption) => {
        setDefaultSupplier(selecteOption);
        setData((pre) => ({
            ...pre,
            supplier: selecteOption.value
        }))
    }
                 
    return (<>

        <form onSubmit={handleSubmit}>

            <div className="form-group row mb-3">
                <label htmlFor="" className="form-label col-sm-3">Product Name </label>
                <div className="col-sm-9">
                    <input type="text" defaultValue={product?.product_name} name="product_name" required placeholder="Enter Product title" onChange={handleChange} className="form-control form-control-sm" id="title" />
                    <span className="text-danger">{err?.product_name}</span>
                </div>
            </div>

            <div className="form-group row mb-3">
                <label htmlFor="" className="form-label col-sm-3">Description</label>
                <div className="col-sm-9">
                    <textarea name="description" defaultValue={product?.description} id="description" rows="7" className="form-control form-control-sm" style={{ "resize": "none" }} onChange={handleChange}>{product?.description}</textarea>
                    <span className="text-danger">{err?.description}</span>
                </div>
            </div>

            <div className="form-group row mb-3">
                <label htmlFor="" className="form-label col-sm-3">Unit Price: </label>
                <div className="col-sm-9">
                    <input type="number" min="0" defaultValue={product?.price_unit} name="price_unit" required placeholder="Enter Product price" onChange={handleChange} className="form-control form-control-sm" id="price" />
                    <span className="text-danger">{err?.price_unit}</span>
                </div>
            </div>


            <div className="form-group row mb-3">
                <label htmlFor="" className="form-label col-sm-3">Quantity: </label>
                <div className="col-sm-9">
                    <input type="number" min="0" defaultValue={product?.quantity} name="quantity" placeholder="Enter Product quantity" onChange={handleChange} className="form-control form-control-sm" id="quantity" />
                    <span className="text-danger">{err?.quantity}</span>
                </div>
            </div>
                        <div className="form-group row mb-3">
                            <label className="form-label col-sm-3">Supplier: </label>
                            <div className="col-sm-9">
                            <Select
                                    value={default_supplier}
                                    onChange={handleSupplierChange}
                                    options={supplier}
                                />
                            </div>
                        </div>
                  
            
            <div className="form-group row mb-3">
                <div className="offset-sm-3 col-sm-9">
                    <button type="reset" className="btn btn-sm btn-danger">
                        <i className="fa fa-trash"></i> Reset
                    </button>
                    &nbsp;
                    <button type="submit" className="btn btn-sm btn-success">
                        <i className="fa fa-paper-plane"></i> Product {product ? 'Update' : 'Create'}
                    </button>

                </div>
            </div>


        </form>
    </>)
}