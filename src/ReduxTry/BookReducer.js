import { buy_book } from "./BookTypes";
const initailState = {
    NumberOfBooks : 20
}
const BookReducer = (state = initailState, action) =>{
    switch(action.type){
        case buy_book: return{
            ...state, NumberOfBooks :state.initailState -1
        }
        default : return state
    }
}
export default BookReducer;