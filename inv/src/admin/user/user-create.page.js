import { postItem} from "../../service/axios.service";
import { AdminPageTitle } from "../components/page-title.component";
import { UserFormComponent } from "./user-form.component";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

export function UserCreate(){
    let navigate = useNavigate();

    const addUser = async (data) => {
        try {
            let response = await postItem('/user',data,true)
            if(response.status){
                toast.success(response.msg);
                navigate('/admin/user');
            }
        } catch(error) {
            toast.error("Error while adding data...");
        }
    }
    return (<>
        <AdminPageTitle 
            title="User Add"
            bread_crumb="User Add"
        />
        <UserFormComponent 
            onHandleSubmit={addUser}
        />
    </>);
}