import { ControlledCarousel } from "../component/common/slider"
import {useState } from 'react';
import "./map.css"
import { postItem } from "../service/axios.service";
import { Toast, ToastContainer } from "react-bootstrap";
let defaultData = {
    email: '',
    message: '',

}

export function HomePage() {
    let [data, setData] = useState(defaultData);
  const handleChange = (ev) => {
    let { name, value } = ev.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })

  }
  

  const handleFormSubmit = () => {
    // axios call to server 
    postItem("/contact/",data)
        .then((suc)=>{
            console.log("success")
            Toast.success("Contact Send")
        })
      .catch((err) => {
        console.log(err)
      })
  }
    return (<>
            <ToastContainer/>
        <div className="container-fluid " padding="5px">
            <ControlledCarousel />
        </div>

        <div className="container-fluid row mt-5 ">
            <div className="col-6">
                <ControlledCarousel />
            </div>
            <div className="col-6">
                <h1 align="center" className="col-12">About us</h1>
               <p>
                Akar Enterprises is the leading Surgical and medical supplier 
                inside kathmandu valley. We are located in blue bird Mall,Kathmandu.</p>
               <p> We supplie the best quality surgical and medical equipement in reasonalble 
                price with fast delivery facilities with in kathmandu valley.</p>
               
            </div>
        </div>

        <div className="container-fluid row mt-5">
            <div className="col-sm-6">
                <div className="mapouter">
                    <div className="gmap_canvas">
                        <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=blue%20star%20complex&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                    </div>
                </div>

            </div>

            <div className="color col-sm-6" style={{ backgroundImage: `url("https://traineeships.ec.europa.eu/sites/default/files/styles/eac_ratio_16_9_large/public/2021-06/contact-03.png?h=a955cd85&itok=Jp1BE4h6")` }}>
                <h1 align="center" className="row-12" >Contact Us</h1>
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                            <input type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' placeholder='email' required />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">message</label>
                            <textarea className="form-control" name="message"onChange={handleChange} placeholder="Message" id="floatingTextarea"></textarea>

                        </div>
                        <button type="submit" name="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    </>)
}