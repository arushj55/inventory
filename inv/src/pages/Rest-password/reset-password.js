import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {postItem} from '../../service/axios.service';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/image/logo.jpg';
import { ChangePassword } from './change-password';

let defaultData = {
  email: ''
}
export function Reset() {


  let [data, setData] = useState(defaultData);
  let [err, setErr] = useState(defaultData);

  let navigate = useNavigate();

  const handleChange = (ev) => {
    // 
    let { name, value } = ev.target;

    // update the state of data when the user inputs something
    setData((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })

    validateForm(name, value);
    // console.log(name, value, type, checked);
  }

  const validateForm = (field, value) => {
    let errMsg = '';
    switch (field) {
      case "email":
        errMsg = value ? (value.includes('@') ? '' : "Invalid Email Format") : 'Email field is required';
        break;
    }
    setErr((pre) => {
      return {
        ...pre,
        [field]: errMsg
      }
    })

  }
  
  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    // axios call to server 
   postItem("/otp/send-email",data)
   .then((succ)=>{

       navigate("/change-password");

  
   })
   .catch((err)=>{
      toast.error("Invalid Email Address")
      console.log("error"+err)
   })
  }
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className='container-fluid'>
        <section className="h-50 gradient-form" style={{ backgroundColor: '#eee' }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-10">
                <div className="card rounded-3 text-black">
                  <div className="row g-0">
                    <div className="col-lg-6">
                      <div className="card-body p-md-5 mx-md-4">

                        <div className="text-center">
                          <img src={logo}
                            style={{ width: "100px" }} alt="logo" />
                          <h4 className="mt-1 mb-5 pb-1">Akar Enterprises</h4>
                        </div>

                        <form onSubmit={handleFormSubmit}>
                          <p>Reset Password</p>

                          <div className="form-outline mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' placeholder='email' required />
                            <span className='text-danger'>
                              {err.email}
                            </span>
                          </div>

                          <div className="text-center pt-1 mb-5 pb-1">
                            <button type="submit" name="submit" className="btn btn-outline-danger">Send OTP</button>

                          </div>

                        </form>

                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center ">
                      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <img src="https://cdn3.iconfinder.com/data/icons/open-hand-bold-linear-outline/300/81453504Untitled-3-512.png"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
