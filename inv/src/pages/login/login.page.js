import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import * as axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
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
            role: user.role
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
      <div className='container row'>
        <div className='col-mb-12'>
          <h1 className='text-center'>
            Login Page
          </h1>
        </div>
      </div>
      <hr></hr>
      <div className='container col-sm-6 '>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' placeholder='email' required />
            <span className='text-danger'>
              {err.email}
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" name="password" placeholder='password' required />
            <span className='text-danger'>
              {err.password}
            </span>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" name="rememberme" onChange={handleChange} />
            <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
          </div>
          <button type="submit" name="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

    </>
  )
}
