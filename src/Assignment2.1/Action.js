import axios from "axios";

export const SET_USERS = 'SET_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

// Action Creators
export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      dispatch(setUsers(response.data));
    } catch (error) {
      console.log('Error:', error);
    }
  };
};

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const deleteUser = (user) => ({
  type: DELETE_USER,
  payload: user,
});
