import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Home from './Home';
import Axios from 'axios';
import { useHistory } from "react-router-dom";

import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";

export default function Layout ()  {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
          <Home/>      
      </Container>
    </React.Fragment>
  );
}