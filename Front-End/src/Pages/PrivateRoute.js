import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({ component: Component,roles, ...rest }) =>(  
    <Route {...rest} render={(props) => (
      localStorage.getItem('isAuthen') === 'employee'
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )