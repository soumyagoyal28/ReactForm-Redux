import { combineReducers } from 'redux';
import formDataReducer from './FormDataReducer';
import usersReducer from '../../Assignment2.1/Reducer';

const rootReducer = combineReducers({
  formData: formDataReducer,
  users: usersReducer
});

export default rootReducer;
