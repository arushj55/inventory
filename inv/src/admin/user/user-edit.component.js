import { getItems, uploader } from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { UserFormComponent } from "./user-form.component";
import {toast} from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function UserEdit(){
    let navigate = useNavigate();
    let params = useParams();
    let [user, setUser] = useState();

    const editUser = async (data, file) => {
        try {
            let response = await uploader('put', 'user/'+ user._id, data, file)
            if(response.status){
                toast.success(response.msg);
                navigate('/dashboard/user');
            }
        } catch(error) {
            toast.error("Error while updating data...");
        }
    }

    useEffect(() => {
        getItems('/user/'+params.id)
        .then((response) => {
            setUser(response.data.result);
        })
        .catch((error) => {
            toast.error(error.response.msg)
            navigate('/dashboard/user');
            // navigate(-1);
        })
    }, []);
    return (<>
        <AdminPageTitle 
            title="User Update"
            bread_crumb="User Update"
        />
        <UserFormComponent 
            onHandleSubmit={editUser}
            user={user}
        />
    </>);
}