import { useEffect, useState } from "react";
import { deleteItem, getItems } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import {toast} from "react-toastify";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox-plus-jquery.js"
import { ActionButton } from "../../component/action-button/action-button.component";
import { getLoggedInUser } from "../../helpers/functions";
import { useNavigate } from "react-router-dom";

export function UserList(){
    const [data, setData] = useState([]);
    let navigate = useNavigate();

    let logged_in_user = getLoggedInUser();
    if(!logged_in_user) {
        toast.error("Your user information has expired. Please login again");
        localStorage.clear();
        navigate('/login');
    }
    const getAllUsers = async () => {
        try {
            let result = await getItems('/user/')
            if(result.data.result){

                let user_data = result.data.result.filter((o) => (o._id != logged_in_user.id))
                setData(user_data)
            }
        } catch(error) {
            // error handle
            toast.error("Error while fetching user data");
        }
    }
    useEffect( () => {
        getAllUsers()
    }, []);

    const onDelete = (id) => {
        deleteItem('/user/'+id, true)
        .then((res) => {
            if(res.data.status) {
                toast.success(res.data.msg);
                getAllUsers()
            } else {
                toast.error(res.data.msg);
            }
        })
        .catch((error) => {
            toast.error(error);
        })
    }
    return (<>
        <AdminPageTitle
            title="User"
            bread_crumb="User List"
            add_link="/admin/user/create"
        />

        <div className="card mb-4">
            <div className="card-body">
                <table className="table table-hover table-bordered table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>S.N</th>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((o,i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{o.full_name}</td>
                                <td>{o.email}</td>
                                <td>{o.address}</td>
                                <td>{o.role}</td>
                                <td>{o.phone}</td>

                                <td>
                                    <ActionButton
                                        editLink={"/admin/user/"+o._id}
                                        id={o._id}
                                        onDelete={onDelete}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    
    </>)
}