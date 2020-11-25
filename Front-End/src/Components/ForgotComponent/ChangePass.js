import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Register from '../RegisterComponent/Register';
import Axios from 'axios';
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

class ChangePassTab extends React.Component {
    constructor(){
        super();
        this.state = {
            userName: '',
            email: '',
            passWord: '',
            passWordConfirm:'',
            show: true
        };
    }
    componentDidMount = () => {

    }

    getUserByToken = () => {
        const check = localStorage.getItem('token');
  
        if (localStorage.getItem('token') !== null) {
          check.toString();
          
        }
     
       Axios.get('https://localhost:44369/api/Login/User?token='+check).then(res => {
    
       if (res.data.role === 'employee' ) {

       }
       else{
         console.log('ffff');
       }
       });
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

    ridirectToRegister = () => {

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

        this.setState({show:false});
        const user = {
            pass: this.state.passWord,
        };

        const check = this.checkValidate();

        if (check === false) {
            Swal.fire(
                'Oops!',
                'Both password is not match.',
                'warning'
              )
            this.setState({show:true});
        }
        else {
            this.setState({show:false});
            axios.post('https://localhost:44369/api/Login/Changepass', user)
            .then(res=>{
                if (res.data.success) {
                    this.setState({show:true});
                    this.props.history.push('/login');
                    Swal.fire(
                        'Success!',
                        'Change password success.',
                        'success'
                      )
                    
                }
                else {
                    this.setState({show:true});
                    Swal.fire(
                        'Fail!',
                        'Has error while we change password, try again.',
                        'error'
                      )
                }
            })    
        }       
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.padding , classes.customLayout}>
                <form className={classes.margin, classes.customGrid} onSubmit={this.handleSubmit}>
                    <h2 className={classes.loginTitle}>Change password</h2>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={this.handldeChangePass} id="username" label="New password" type="password" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={this.handldeChangeConfirmPass} id="username" label="Confirm password" type="password" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                    { this.state.show ? <Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Change</Button> : <CircularProgress  /> }
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default withStyles(styles)(ChangePassTab);