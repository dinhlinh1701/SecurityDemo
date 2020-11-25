import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import { useHistory } from "react-router-dom";

export default function AdminPage() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [role,setRole] = useState('');
    useEffect(  () => {
      checkUser();
    });
    let history = useHistory();
  
    const checkUser = async () => {
  
      const check = localStorage.getItem('token');
  
      if (localStorage.getItem('token') !== null) {
        check.toString();
      }
  
  
    await Axios.get('https://localhost:44369/api/Login/User?token='+check).then(res => {
  
     if (res.data.userName === 'admin') {
      setName(res.data.name);
      setRole(res.data.role);
     }
     else{
       history.push('/404');
     }
     });
    }
    return <h1>Admin Page</h1>
}