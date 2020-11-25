import { BrowserRouter as Router, Route, Link, NavLink, useHistory,Redirect } from "react-router-dom";
import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Login from "../../Components/LoginComponent/Login";
import Axios from 'axios';
import  { useEffect } from 'react';

export default function Nav() {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [role,setRole] = useState('');
    useEffect(  () => {
      checkUser();
    });
  
    const checkUser = async () => {
  
      const check = localStorage.getItem('token');
  
      if (localStorage.getItem('token') !== null) {
        check.toString();
      }
  
  
    await Axios.get('https://localhost:44369/api/Login/User?token='+check).then(res => {
  
     if (res.data.role !== null) {
      setName(res.data.userName);
      setRole(res.data.role);
     }
     else{
       history.push('/401');
     }
     });
    }


    const [icon,setIcon] = useState('');
    const history = useHistory();
    const logOut = () => {
        localStorage.clear();
        history.push('/login');
        window.location.reload();
    }

    return (
        <div>
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div className="container">
                <a className="navbar-brand" asp-area="" asp-page="/Index">Employee Management</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                    <ul className="navbar-nav flex-grow-1">
                        <li className="nav-item">
                        <Link to="/page1"  className="nav-link text-dark">Employees</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/page2" className="nav-link text-dark">Assign Work</Link>
                        </li>
                        <li className="nav-item">
                        <Link to="/adminpage"  className="nav-link text-dark">Admin Page</Link>
                        </li>
                    </ul>
                    
                </div>
                {name}
                &emsp;
                { () => { true ? setIcon('logout') : setIcon('login') } }
                <Link onClick={logOut}  className="nav-link text-dark">Logout</Link>
            </div>
        </nav>
    </div>
    );
}