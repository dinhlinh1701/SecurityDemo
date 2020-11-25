import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2'
import { PaginationItem } from '@material-ui/lab';
import Pagination from './Pagination';
import EditEmployee from './EditEmployee';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export default function Page1() {
    const classes = useStyles();
    const [currentPage, setcurrentPage] = useState(1);
    const [employeesPerPage, setEmployeesPerPage] = useState(3);
    const [loading, setLoading] = useState(false);
    const [employees,setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [employeeName,setEmployeeName] = useState('');
     const [employeeEmail,setEmployeeEmail] = useState('');
     const [employeeRole,setEmployeeRole] = useState('');
     const [employeeId, setEmployeeId] = useState(0);

    useEffect(  () => {
        setLoading(true);
        listAllEmployee();
        setLoading(false);
    });
    let history = useHistory();
    const listItems = employees.map((number) =>
        <li key={number.id}>{number.userName}</li>
    );

    const Employees = ({employees , loading}) => {
        if (loading) {
            return <p>Loading...</p>;
        }
        return (

            <ul className='list-group mb-4'>
                {
                    employees.map(emp => (

                        <li key={emp.id} className='list-group-item'>
                            {emp.userName}
                        </li>
                    ))
                }
            </ul>
        );
    };
  
    const listAllEmployee = () => {
        Axios.get('https://localhost:44369/api/Login/employees').then(res => {
  
            if (res.data.success === true) {
             
                setEmployees(res.data.data);
        
            }
            else{

                alert('error');
            //   history.push('/404');
            }
            });
    }

    function handleEdit (emp) {
        handleClickOpen();
        editEmployee(emp);
    }

    const editEmployee = (emp) => {
      setEmployeeId(emp.id);

      setEmployeeName(emp.userName);
      setEmployeeEmail(emp.emailAddress);
      setEmployeeRole(emp.role);
    }
    

    function handleDelete(id) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You will lost this employee, think again?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

            Axios.delete('https://localhost:44369/api/Login/delete/'+ id).then(res => {
                if (res.data.success) {
                    Swal.fire(
                        'Delete success!',
                        'The user has been deleted.',
                        'success'
                      )
                }
                else {
                    Swal.fire(
                        'Delete fail!',
                        'Some error happen while deleting.',
                        'error'
                      )
                }

            });


            }
          })
    }
    //get current post
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee,indexOfLastEmployee);


    const Paginate = (pageNumber) => {
        setcurrentPage(pageNumber);
    }


    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
      };

      const handleSubmitEdit = () => {

        const user = {
          id : employeeId,
          userName : employeeName,
          emailAddress : employeeEmail,
          role : employeeRole
        }


        console.log(user);

        Axios.post('https://localhost:44369/api/Login/edit', user).then(res => {
          if (res.data.success) {
            setOpen(false);
              Swal.fire(
                  'Edit success!',
                  'The user has been edited.',
                  'success'
                )
          }
          else {
              Swal.fire(
                  'Edit fail!',
                  'Some error happen while editing.',
                  'error'
                )
          }

      });


      }

      const handleChangeName = (event) => {
        setEmployeeName(event.target.value);
      }
      const handleChangeEmail = (event) => {
        setEmployeeEmail(event.target.value);
      }
      const handleChangeRole = (event) => {
        setEmployeeRole(event.target.value);
      }

    return ( <div>
        <h1>List Employee</h1>
        <br/>
        <br/>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Employee Name</b></TableCell>
            <TableCell align="right"><b>Email</b></TableCell>
            <TableCell align="right"><b>Role</b></TableCell>
            <TableCell align="right"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentEmployees.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.userName}
              </TableCell>
              <TableCell align="right">{row.emailAddress}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right"><a onClick={()=> handleEdit(row)} style={{color:"black"}}><EditIcon/></a> <a onClick={() => handleDelete(row.id)} style={{color:"black"}}><DeleteIcon/></a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination employeesPerPage = {employeesPerPage} totalEmployees ={employees.length} Paginate={Paginate}/>


    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Employee Name"
            type="text"
            fullWidth
            value={employeeName}
            onChange={handleChangeName}
          />
             <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={employeeEmail}
            onChange={handleChangeEmail}
          />
          
            <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value= {employeeRole}
          onChange={handleChangeRole}
          label="Role"
          style={{width:"100%"}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="superadmin">Super Admin</MenuItem>
        </Select>

        




        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitEdit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </div> )
}