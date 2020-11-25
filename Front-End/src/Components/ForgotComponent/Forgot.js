import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Register from '../RegisterComponent/Register';
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
        fontSize: '0.875rem',
       
    },
    fixedLink: {
        paddingTop: '1em !important'
    }

});

class ForgotTab extends React.Component {
    constructor(){
        super();
        this.state = {
            email: '',
            show: true
        };
    }

    handldeChangeMail = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handleSubmit = (event) => {

        this.setState({show: false})

        const user = {
            email: this.state.email,
        };
        
        axios.post('https://localhost:44369/api/Login/Sendemail', user)
        .then(res=>{
            if (res.data.success) {
                this.setState({show:true})
                Swal.fire(
                    'Success!',
                    'Please check your email.',
                    'success'
                  )
                localStorage.setItem('mail',true);
            }
            else {
                this.setState({show:true})
                Swal.fire(
                    'Fail!',
                    res.data.message,
                    'error'
                  )
            }
        })

        
        event.preventDefault();
    }


    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.padding , classes.customLayout}>
                <form className={classes.margin, classes.customGrid} onSubmit={this.handleSubmit}>
                    <h2 className={classes.loginTitle}>Forgot password</h2>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={this.handldeChangeMail} id="username" label="Email" type="text" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                        <Grid container alignItems="left" className={classes.fixedLink}>                           
                        <Grid item >                           
                            <Link to="/login" className={classes.link}>Have a account ?</Link>
                        </Grid>
                        </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        
                        { this.state.show ? <Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Send</Button> : <CircularProgress  /> }
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(ForgotTab);