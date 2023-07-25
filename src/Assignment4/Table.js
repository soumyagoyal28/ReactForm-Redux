import React, { useState } from 'react';
// import axios from 'axios';
import { TableContainer, TableHead, TableRow, TableBody, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import '../App.css'
import CustomModal from './Components/CustomModal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CustomTable from './Components/CustomTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "Teal",
      color: theme.palette.common.white,
      border:"1px solid black",
      textAlign:"center"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    
  }));

  // const getData = () => {
  //   // Simulating data retrieval
  //   const response = {
  //     data: [
  //       {
  //         id: 1,
  //         first: 'John',
  //         last: 'Doe',
  //         contact: '1234567890',
  //         email: 'john.doe@example.com',
  //         gender: 'Male'
  //       },
  //       {
  //         id: 2,
  //         first: 'Jane',
  //         last: 'Smith',
  //         contact: '9876543210',
  //         email: 'jane.smith@example.com',
  //         gender: 'Female'
  //       },
        // ... more data
  //     ]
  //   };
  //   return response.data;
  // };

export default function UserList() {
  // const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const formData = useSelector((state) => state.formData);
  const [editedUser, setEditedUser] = useState({
    first: '',
    last: '',
    contact: '',
    email: '',
    gender: ''
  });
  const usersPerPage = 5;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  

  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {
  //       // const data = getData();
  //       // const response = await axios.get('../db.json');
  //       setUsers(data);
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }
  //   }

  //   fetchUsers();
  // }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const displayedUsers = formData.slice(firstIndex, lastIndex);
  // console.log('users', users);
  

  const handleEdit = (id) => {
    setSelectedUserId(id);
    setEditDialogOpen(true);
    const user = formData.find((user) => user.id === id);
    setEditedUser({
      first: user.first,
      last: user.last,
      contact: user.contact,
      email: user.email,
      gender: user.gender
    });
    // setEditedUser(user);
  };

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmationDialogConfirm = () => {
    // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUserId));
    dispatch({ type: 'DELETE_FORM_DATA', payload: { id: selectedUserId } });
    setConfirmationDialogOpen(false);
    console.log(selectedUserId);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditedUser({
      first:'',
      last: '',
      contact: '',
      email: '',
      gender: ''
    });
  };
  const handleEditDialogSave = () => {
    // const updatedUsers = formData.map((user) => {
    //   if (user.id === selectedUserId) {
    //     return {
    //       ...user,
    const updatedUsers = {
          id: selectedUserId,
          first: editedUser.first,
          last: editedUser.last,
          contact: editedUser.contact,
          email: editedUser.email,
          company: editedUser.gender
      }
    // setUsers(updatedUsers);
    dispatch({ type: 'EDIT_FORM_DATA', payload: updatedUsers });
    setEditDialogOpen(false);
    setEditedUser({
      first:'',
      last: '',
      contact: '',
      email: '',
      gender: ''
    });
    
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  console.log("formData", formData);

  return (
    <div className='containerPadding'>
      <h1>User List</h1>
      <TableContainer component={Paper}>
        <CustomTable className='containerTable'>
          <TableHead>
          <StyledTableRow sx={{border:"1px solid black"}}> 
          <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Contact</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {displayedUsers?.map((user) => (
              <StyledTableRow key={user.id}>
              <StyledTableCell>{user.id}</StyledTableCell>
              <StyledTableCell>{user.first}</StyledTableCell>
              <StyledTableCell>{user.last}</StyledTableCell>
              <StyledTableCell>{user.contact}</StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>{user.gender}</StyledTableCell>
              <StyledTableCell>
                <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => handleEdit(user.id)}>
                    <EditIcon/>
                </IconButton>
                <IconButton
                    aria-label="delete"
                    color="Red"
                    onClick={() => handleDelete(user.id)}>
                    <DeleteIcon/>
                </IconButton>
              </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </CustomTable>
      </TableContainer>
      <Pagination
        count={Math.ceil(formData.length / usersPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        style={{ marginTop: '20px' }}
      />
      <p>{`${firstIndex + 1} - ${Math.min(lastIndex, formData.length)} of ${formData.length}`}</p>

      <CustomModal open={confirmationDialogOpen} onClose={handleConfirmationDialogClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent> 
          <p>Are you sure you want to delete?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmationDialogConfirm} color="error">Delete</Button>
        </DialogActions>
      </CustomModal>

      <CustomModal open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
        <TextField
            label="First Name" value={editedUser.first} variant='filled'
            onChange={(e) => setEditedUser({ ...editedUser, first: e.target.value })}
            fullWidth
          />
        <TextField
            label="Last Name" value={editedUser.last} variant='filled'
            onChange={(e) => setEditedUser({ ...editedUser, last: e.target.value })}
            fullWidth
          />
          <TextField
            label="Contact" variant = 'filled' value={editedUser.contact}
            onChange={(e) => setEditedUser({ ...editedUser, contact: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email" variant = 'filled' value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            fullWidth
          />
          <TextField
            label="Gender" variant = 'filled' value={editedUser.gender}
            onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
            fullWidth
          />
          </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditDialogSave} color="primary">Save</Button>
        </DialogActions>
      </CustomModal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          Saved Successfully
        </MuiAlert>
      </Snackbar>
      <br />
      <Button variant="contained" color="primary" onClick={() => navigate('/form')}>Add User</Button>
    </div>

    
  );
}