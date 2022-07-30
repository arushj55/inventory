import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import * as axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/image/logo.jpg';

let defaultData = {
  email: '',
  password: '',
  remember_me: ''
}
export function Login() {
  /*
  useEffect(()=>{
    let is_logged_in=false;
    let role='retailer';
    if(is_logged_in && role){
      return(<Navigate to={"/"+role}></Navigate>)
    }
  },[])
  */

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
      case "password":
        errMsg = value ? (value.length < 7 ? 'Password must be at least 8 characters' : '') : 'Password is required'
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

    axios.post('http://localhost:3005/auth/login', data)
      .then((res) => {
        if (res.status === 200) {
          let data = res.data;
          let token = data.result.token;
          let user = data.result.User;
          localStorage.setItem("reactuser_token", token);
          localStorage.setItem("reactuser_user", JSON.stringify({
            name: user.full_name,
            email: user.email,
            password: user.password,
            role: user.role,
            id: user._id
          }));

          sessionStorage.setItem('reactuser_token', token);
          sessionStorage.setItem('reactuser_user', JSON.stringify({
            name: user.full_name,
            email: user.email,
            role: user.role
          }));

          //toast.success("Welcome to user panel");

          navigate("/dashboard");


        }
        else {
          // error handle
          toast.error("Invalid credentials");
        }
      })

      .catch((err) => {
        console.log(err)
        toast.error("Incorrect password or email format");
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
                          <p>Please login to your account</p>

                          <div className="form-outline mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' placeholder='email' required />
                            <span className='text-danger'>
                              {err.email}
                            </span>
                          </div>

                          <div className="form-outline mb-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" name="password" placeholder='password' required />
                            <span className='text-danger'>
                              {err.password}
                            </span>
                          </div>

                            <a href="reset-password"> Forget/Reset Password?</a>


                          <div className="text-center pt-1 mb-5 pb-1">
                            <button type="submit" name="submit" className="btn btn-outline-danger">Submit</button>

                          </div>

                        </form>

                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h4 className="mb-4">We are more than just a company</h4>
                        <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
