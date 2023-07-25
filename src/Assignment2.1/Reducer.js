// import { combineReducers } from 'redux';

// // Define your initial state
// const initialState = {
//   users: [],
// };

// // Create a reducer for users
// const usersReducer = (state = initialState.users, action) => {
//   switch (action.type) {
//     case 'SET_USERS':
//       return action.payload;
//     case 'FETCH_USER':
//         return{
//             async function fetchUsers() {
//                     try {
//                       const response = await axios.get(
//                         'https://jsonplaceholder.typicode.com/users'
//                       );
//                       dispatch(setUsers(response.data));
//                     } catch (error) {
//                       console.log('Error:', error);
//                     }
//                   }
//         }
//     case 'UPDATE_USER':
//       return state.map((user) =>
//         user.id === action.payload.id ? action.payload : user
//       );
//     case 'DELETE_USER':
//       return state.filter((user) => user.id !== action.payload);
//     default:
//       return state;
//   }
// };

// // Combine all reducers into a root reducer
// const Reducer = combineReducers({
//   users: usersReducer,
// });

// export default Reducer;
// import { combineReducers } from 'redux';
import { SET_USERS, UPDATE_USER, DELETE_USER } from './Action';

// Define your initial state
const initialState = {
  users: [],
};


// Create a reducer for users
const usersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    case UPDATE_USER:
      return state.map((user) => (user.id === action.payload.id ? action.payload : user));
    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};

// Combine all reducers into a root reducer
// const rootReducer = combineReducers({
//   users: usersReducer,
// });

export default usersReducer;
