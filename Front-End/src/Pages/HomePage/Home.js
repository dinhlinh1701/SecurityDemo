import { Switch } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Login from '../../Components/LoginComponent/Login';
import About from '../ContentPage/About';
import page1 from '../ContentPage/page1';
import Page1 from '../ContentPage/page1';
import Page2 from '../ContentPage/page2';
import Page3 from '../ContentPage/page3';
import Page4 from '../ContentPage/NoPermission';
import PermissionPage from '../ContentPage/NoPermission';
import { PrivateRoute } from '../PrivateRoute';
import Footer from './Footer';
import Nav from './Nav';
import NoPermission from '../ContentPage/NoPermission';
import AdminPage from '../AdminPage/AdminPage';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { PrivateAdminArea } from './PrivateAdminArea';
import TodoApp from '../ContentPage/testPagination';
import Notfound from '../../Components/NotfoundComponent/Notfound';

function Home() {
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
     if (res.data.role !== null ) {
      setName(res.data.userName);
      setRole(res.data.role);
     }
     else{
       console.log('ffff');
     }
     });
    }
    return (
        <Router>
            <Nav/>
                <div className="container" style={{minHeight: '61em'}}>
                <main role="main">
                    <Route path="/page1" exact component={Page1}/>
                    <Route path="/page2" exact component={TodoApp}/>
                    <Route path="/page3" exact component={Page3}/>
                    <Route path="/layout" exact component={Page1}/>
                    <Route path="/401" exact component={NoPermission}/>
                    <PrivateAdminArea path="/adminpage" roles={role} component={AdminPage} />
                    <Route path="/" exact component={Page1}/>
                </main>
                </div>
            <Footer/>
        </Router>
    );
  }
  
  export default Home;