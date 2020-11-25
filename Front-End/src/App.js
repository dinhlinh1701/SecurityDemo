import logo from './logo.svg';
import './App.css';
import Login from './Components/LoginComponent/Login';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Register from './Components/RegisterComponent/Register';
import Forgot from './Components/ForgotComponent/Forgot';
import FillCode from './Components/ForgotComponent/FillCode';
import NotFound from './Components/NotfoundComponent/Notfound';
import ChangePass from './Components/ForgotComponent/ChangePass';
import Layout from './Pages/HomePage/Layout';
import Home from './Pages/HomePage/Home';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { PrivateRoute } from './Pages/PrivateRoute';
import { PrivateMailCode } from './Pages/HomePage/PrivateMailCode';

function App() {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [role,setRole] = useState('');
  const [isAuthenticate,setIsauthenticate] = useState(false);
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

    setIsauthenticate(true);
   if (res.data !== null ) {
    setName(res.data.userName);
    setRole(res.data.role);
    localStorage.setItem('isAuthen',true);
   }
   else{
     localStorage.setItem('isAuthen',false);
   }
   });
  }

  return (
    <Router>
    <div className="App">
        <Route path="/register" exact component={Register} />
        <Route path="/fillcode" exact component={FillCode} />
        <Route path="/forgot" exact component={Forgot} />
        <Route path="/login" exact component={Login}/>
        <PrivateRoute path='/' roles={role} component={Layout} />
        <PrivateMailCode path="/changepass" component={ChangePass}/>
        <Route path="/notfound" component={NotFound}/>
        <PrivateRoute path='/layout' roles={role} component={Layout} />
    </div>
  </Router>
  );
}

export default App;
