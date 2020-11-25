import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Register from '../RegisterComponent/Register';
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
    },
    fixedLink: {
        paddingTop: '1em !important'
    }
});

class FillCodeTab extends React.Component {
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

    ridirectToRegister = () => {

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
            <Paper className={classes.padding , classes.customLayout}>
                <form className={classes.margin, classes.customGrid} onSubmit={this.handleSubmit}>
                    <h2 className={classes.loginTitle}>Enter the code</h2>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={this.handldeChangeName} id="username" label="Code" type="text" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="left" className={classes.fixedLink}>                           
                        <Grid item >                           
                            <Link to="/forgot" className={classes.link}>Back</Link>
                        </Grid>
                        </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Send</Button>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(FillCodeTab);