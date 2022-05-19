import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login.page";
import Footer from "./common/footer/footer.component";
import Header from "./common/header/header.component";
import { useEffect, useState } from "react";
import { postItem } from "../service/axios.service";
import { AdminLayout } from "../layout/admin.layout"
import { useNavigate } from 'react-router-dom';
import {
    AdminDashboard,
    SupplierList,
    SupplierCreate,
    SupplierPage,
    SupplierEdit,
    UserList,
    UserCreate,
    UserPage,
    UserEdit,
    ProductCreate,
    ProductEdit,
    ProductList,
    ProductPage

} from "../admin";
function Home() {
    return (<>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </>
    )
}

function AdminPrivateRoutes({ component }) {
    // TODO: Login check 
    let [role, setRole] = useState();
    let token = localStorage.getItem('reactuser_token');
    let navigate = useNavigate();

    useEffect(() => {
        postItem('/auth/isAdmin', {}, true)
            .then((response) => {
                if (response.status === 200) {
                    setRole(response.data.result.role);
                }
            })
            .catch((error) => {
                if (error.response.status !== 200) {
                    navigate('/login')
                }
            })
    })
    if (role) {
        if (token) {
            //console.log("token",role)
            if (role === 'admin' || role === 'staff') {
                return component;
            } else {
                return <Navigate to={"/" + role}></Navigate>
            }
        } else {
            return <Navigate to={"/login"}></Navigate>
        }
    } else {
        return <></>
    }

    // return is_logged && role =='admin' ? component : <Navigate to="/login"></Navigate>
}

export function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}>
                        <Route path='login' element={<Login />}></Route>
                    </Route>

                    <Route path="/dashboard" element={<AdminPrivateRoutes component={<AdminLayout />}></AdminPrivateRoutes>}>
                        <Route index element={<AdminDashboard></AdminDashboard>}></Route>

                        <Route path="user" element={<UserPage />}>
                            <Route index element={<UserList />}></Route>
                            <Route path="create" element={<UserCreate />}></Route>
                            <Route path=":id" element={<UserEdit />}></Route>
                        </Route>

                        <Route path="supplier" element={<SupplierPage />}>
                            <Route index element={<SupplierList />}></Route>
                            <Route path="create" element={<SupplierCreate />}></Route>
                            <Route path=":id" element={<SupplierEdit />}></Route>
                        </Route>

                        <Route path="product" element={<ProductPage />}>
                            <Route index element={<ProductList />}></Route>
                            <Route path="create" element={<ProductCreate />}></Route>
                            <Route path=":id" element={<ProductEdit />}></Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
