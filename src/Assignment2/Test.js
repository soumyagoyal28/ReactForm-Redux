import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    fetchUsers();
  }, []);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const displayedUsers = users.slice(firstIndex, lastIndex);

  return (
    <div>
      <h1>User List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address.city}, {user.address.street}, {user.address.suite}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
    </div>
  );
}