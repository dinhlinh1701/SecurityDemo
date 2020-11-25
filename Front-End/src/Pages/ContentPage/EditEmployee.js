import Axios from "axios";



   export default function  EditEmployee (emp) {
  
const user = {
    id: emp.id,
    userName: emp.userName,
    emailAddress: emp.emailAddress,
    role: emp.role
}

    Axios.put('https://localhost:44369/api/Login/edit',user).then(res => {
        if (res.data.success) {
            return true;
        }
        else {
       return false;
        }

    });
}