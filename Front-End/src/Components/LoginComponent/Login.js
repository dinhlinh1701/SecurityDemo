import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Register from '../RegisterComponent/Register';
import { Alert, AlertTitle } from '@material-ui/lab';
import ProgressButton from 'react-progress-button'

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

class LoginTab extends React.Component {
    constructor(){
        super();
        this.state = {
            userName: '',
            passWord: '',
            rememberMe: false,
            isLogin: null,
            show: true
        };
    }

    // componentDidUpdate(){
    //     setTimeout(() => this.setState({isLogin:null}), 3000);
    //   }

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

    ridirectToRegister = () => {

    }

    handleSubmit = (event) => {

        
        this.setState({show: false});

        const user = {
            name: this.state.userName,
            pass: this.state.passWord,
            rememberMe: this.state.rememberMe
        };

        axios.post('https://localhost:44369/api/Login/login', user)
        .then(res=>{
            if (res.data.success) {
                this.setState({show: true});
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('isAuthen','employee')
                this.props.history.push('/layout');              
            }
            else {

                this.setState({
                    isLogin: false,
                    show: true
                });
            }
        })

        event.preventDefault();
    }

    // handleshow = () => {
    //     this.setState ((prevState) => {
    //       return {
    //       show : !prevState.show
    //     }});}

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.padding , classes.customLayout}>
                <form className={classes.margin, classes.customGrid} onSubmit={this.handleSubmit}>
                    <h2 className={classes.loginTitle}>Login</h2>
                    <div style={{marginBottom: '1em'}}>{this.state.isLogin == false ? <Alert severity="error">Incorrect username or password!</Alert> : ''}</div>
                    
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
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox onClick={this.handldeRememberMe}
                                    color="primary"
                                />
                            } label="Remember me" />
                        </Grid>

                    </Grid>
                    
                    <Grid container alignItems="left">                           
                        <Grid item >
                            <Link to="/forgot" className={classes.link}>Forgot password ?</Link>
                        </Grid>
                        &emsp;
                        <Grid item>                           
                            <Link to="/register" className={classes.link}>Dont have any account ?</Link>
                        </Grid>
                        </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        
                        { this.state.show ? <Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button> : <CircularProgress  /> }
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(LoginTab);