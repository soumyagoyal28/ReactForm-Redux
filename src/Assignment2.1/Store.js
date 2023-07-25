import { createStore } from 'redux';

// Define the initial state
const initialState = {
  users: [],
};

// Define the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload.updatedUser;
          }
          return user;
        }),
      };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer);

export default store;
