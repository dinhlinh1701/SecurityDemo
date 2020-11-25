import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Alert, AlertTitle } from '@material-ui/lab';
import SweetAlert from 'sweetalert-react';
import Swal from 'sweetalert2';

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

class RegisterTab extends React.Component {
    constructor(){
        super();
        this.state = {
            email:'',
            userName: '',
            passWord: '',
            passWordConfirm: '',
            isEmailExist: true,
            isMatch: true,
            show: true
        };
    }


    handldeChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
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

    handldeChangeConfirmPass = (event) => {
        this.setState({
            passWordConfirm: event.target.value,
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


    checkPass = (pass, passConfirm) => {
        if (pass !== passConfirm) {
            this.setState({isMatch: false});
            return false;
        }
        else {
            this.setState({isMatch: true});
            return true;
        }
    }
    checkValidate = () => {
        if (this.state.passWord === this.state.passWordConfirm)
        {
            return true;
        }
        else {
            return false;
        }
    }

    handleSubmit = (event) => {

            this.setState({show: false});

            const user = {
                name: this.state.userName,
                pass: this.state.passWord,
                email: this.state.email
            };

            const check = this.checkValidate();

            if (check === false) {
                this.setState({show: true})
                Swal.fire(
                    'Oops!',
                    'Both passwords is not match.',
                    'warning'
                  )
            }
            else {
                this.setState({show: false})
                axios.post('https://localhost:44369/api/Login/register', user)
                .then(res=>{
                    if (res.data.success) {
                        this.setState({show: true});
                        this.props.history.push('/login');
                        Swal.fire(
                            'Success!',
                            'Register success.',
                            'success'
                          )
                         
                    }
                    else {
                        this.setState({show: true});
                        Swal.fire(
                            'Oops!',
                            'Username or email already exist.',
                            'error'
                          )
                    }
                });
            }
   
            event.preventDefault();      
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.padding , classes.customLayout}>
                <form className={classes.margin, classes.customGrid} onSubmit={this.handleSubmit}>
                    <h2 className={classes.loginTitle}>Register</h2>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={this.handldeChangeEmail} id="email" label="Email" type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={this.handldeChangeName} id="username" label="Username" type="text" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={this.handldeChangePass} id="username" label="Password" type="password" fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={this.handldeChangeConfirmPass} id="username" label="Password Confirm" type="password" fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox onClick={this.handldeRememberMe}
                                    color="primary"
                                />
                            } label="Accept the terms of use" />
                        </Grid>
                        <Grid item>                           
                            <Link to="/login" className={classes.link}>Have a account ?</Link>
                        </Grid>
                    </Grid>

                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                    { this.state.show ? <Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Register</Button> : <CircularProgress  /> }
                    </Grid>
                </form>
            </Paper>
        );
    }}

export default withStyles(styles)(RegisterTab);