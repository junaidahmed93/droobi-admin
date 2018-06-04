import CONSTANTS from '../constants/actionConstants';

const initialState = {
  error: '',
  bookingSaved: false,
};

const NewBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.NEW_BOOKING_SUCCESS:
      return Object.assign({}, state, {
        bookingSaved: true,
      });
    case CONSTANTS.NEW_BOOKING_SUCCESS_AFTER:
      return Object.assign({}, state, {
        bookingSaved: false,
      });
    case CONSTANTS.NEW_BOOKING_FAIL:
      return Object.assign({}, state, {
        bookingSaved: false,
      });


    default:
      return state;
  }
};
export default NewBookingReducer;
