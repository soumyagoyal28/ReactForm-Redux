import { combineReducers } from 'redux';
import formDataReducer from './FormDataReducer';

const rootReducer = combineReducers({
  formData: formDataReducer,
});

export default rootReducer;
