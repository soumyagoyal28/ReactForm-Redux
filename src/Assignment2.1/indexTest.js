import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

export default function UserList() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    address:{
      street: '',
      city: ''
    },
    phone: '',
    company: ''
  });
  const usersPerPage = 5;
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({ type: 'SET_USERS', payload: response.data });
  } catch (error) {
    console.log('Error:', error);
  }
};

    fetchUsers();
  }, [dispatch]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const displayedUsers = users.slice(firstIndex, lastIndex);

  const handleEdit = (id) => {
    setSelectedUserId(id);
    setEditDialogOpen(true);
    const user = users.find((user) => user.id === id);
    setEditedUser({
      name: user.name,
      email: user.email,
      address: {
        street: user.address.street,
        city: user.address.city
      },
      phone: user.phone,
      company: user.company.name
    });
  };

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmationDialogConfirm = () => {
    dispatch({ type: 'DELETE_USER', payload: selectedUserId });
    setConfirmationDialogOpen(false);
    console.log(selectedUserId);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditedUser({
      name: '',
      email: '',
      address:{
        street:'',
        city: ''
      },
      phone: '',
      company: ''
    });
  };
  const handleEditDialogSave = () => {
    const updatedUsers = {
      id: selectedUserId,
      updatedUsers: {
        ...editedUser,
        company: {
          ...editedUser.company,
          name: editedUser.company,
        },
      },
    };
    dispatch({ type: 'UPDATE_USER', payload: updatedUsers });
    setEditDialogOpen(false);
    setEditedUser({
      name: '',
      email: '',
      address: {
        street: '',
        city: '',
      },
      phone: '',
      company: '',
    });
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className='containerPadding'>
      <h1>User List</h1>
      <TableContainer component={Paper}>
        <CustomTable className='containerTable'>
          <TableHead>
          <StyledTableRow sx={{border:"1px solid black"}}> 
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map(user => (
              <StyledTableRow key={user.id}>
              <StyledTableCell>{user.id}</StyledTableCell>
              <StyledTableCell>{user.name}</StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>{user.address.street}, {user.address.city}</StyledTableCell>
              <StyledTableCell>{user.phone}</StyledTableCell>
              <StyledTableCell>{user.company.name}</StyledTableCell>
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
        count={Math.ceil(users.length / usersPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        style={{ marginTop: '20px' }}
      />
      <p>{`${firstIndex + 1} - ${Math.min(lastIndex, users.length)} of ${users.length}`}</p>
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
            label="Name" value={editedUser.name} variant='filled'
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email" variant = 'filled' value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            fullWidth
          />
          <TextField
            label="Street" variant='filled'
            value={editedUser.address.street}
            onChange={(e) => setEditedUser({ ...editedUser, address: { ...editedUser.address, street: e.target.value } })}
            fullWidth
          />
          <TextField
            label="City" variant='filled'
            value={editedUser.address.city}
            onChange={(e) => setEditedUser({ ...editedUser, address: { ...editedUser.address, city: e.target.value } })}
            fullWidth
          />
          <TextField
            label="Phone" variant = 'filled' value={editedUser.phone}
            onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
            fullWidth
          />
          <TextField
            label="Company" variant = 'filled' value={editedUser.company}
            onChange={(e) => setEditedUser({ ...editedUser, company: e.target.value })}
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
    </div>
  );
}