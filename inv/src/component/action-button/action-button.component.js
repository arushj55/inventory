import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";


export function ActionButton({editLink, id, onDelete}) {

    const showConfirm = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                onDelete(id)
            }
          })
    }

    return (<>
        <NavLink to={editLink} className="btn btn-sm btn-success btn-rounded" >
            <i className="fa fa-pen"></i>
        </NavLink>
        <NavLink onClick={showConfirm} to="/delete" className="btn btn-sm btn-danger btn-rounded" >
            <i className="fa fa-trash"></i>
        </NavLink>
    </>)
}