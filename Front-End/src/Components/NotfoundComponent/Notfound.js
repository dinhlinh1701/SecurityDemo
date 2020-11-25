import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    },
    customLayout: {
        width: '20% !important',
        marginTop: '14%',
        marginLeft: '38%'
    },
    customGrid: {
        marginLeft: '3em',
        marginRight: '3em',
        paddingBottom: '1em',
    },
    loginTitle: {
        paddingTop: '1em'
    },
    link: {
        color:'#3f51b5' ,
        fontSize: '0.875rem'
    }
});

class NotFoundTab extends React.Component {
    constructor(){
        super();
        this.state = {
            userName: '',
            passWord: '',
            rememberMe: false,
            isLogin: false
        };
    }

    handldeChangeName = (event) => {
        this.setState({
            userName: event.target.value,
        })
    }
    handldeChangePass = (event) => {
        this.setState({
            passWord: event.target.value,
        })
    }
    handldeRememberMe = (e) => {
        if (e.target.checked) {
            this.setState({rememberMe: true});
        }
        else {
            this.setState({rememberMe: false});
        }
    }

    handleSubmit = (event) => {
        console.log(typeof(this.state.userName));
        console.log(typeof(this.state.passWord));
        console.log(this.state.rememberMe);
        const user = {
            name: this.state.userName,
            pass: this.state.passWord,
            rememberMe: this.state.rememberMe
        };

        axios.post('https://localhost:44369/api/Login/login', user)
        .then(res=>{
            if (res.data.success) {
                alert("login success");
                
            }
            else {
                alert("login fail");
            }
        })

        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        return (
<h1>Page not found!</h1>
        );
    }}

export default withStyles(styles)(NotFoundTab);