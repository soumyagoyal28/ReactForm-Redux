import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Components/Table';

export default function UserList() {
  const [users, setUsers] = useState([]);
  
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

  
  return (
    <div>
      <h1>User List</h1>
      <Table
        users={users}
      />
    </div>
  );
}
