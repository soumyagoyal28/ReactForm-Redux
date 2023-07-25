const initialState = [];

const formDataReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'ADD_FORM_DATA':
      return [...state, action.payload];
      case 'EDIT_FORM_DATA':
        return state.map((user) =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        );
      case 'DELETE_FORM_DATA':
        return state.filter((user) => user.id !== action.payload.id);
    default:
      return state;
  }
  
};

export default formDataReducer;
