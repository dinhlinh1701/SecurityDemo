import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const PrivateMailCode = ({ component: Component,roles, ...rest }) => (

    <Route {...rest} render={(props) => (
      localStorage.getItem('mail') === null
        ? <Component {...props} />
        : <Redirect to='/forgot' />
    )} />
  )