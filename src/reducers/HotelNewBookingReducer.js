import CONSTANTS from '../constants/actionConstants';

const initialState = {
  error: '',
  bookingSaved: false,
};

const HotelNewBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_HOTEL_BOOKING_SUCCESS:
      console.log('hotel booking reduceer success');
      return Object.assign({}, state, {
        bookingSaved: true,
      });
    case CONSTANTS.ADD_HOTEL_BOOKING_SUCCESS_AFTER:
      console.log('hotel booking reduceer success after');
      return Object.assign({}, state, {
        bookingSaved: false,
      });
    case CONSTANTS.ADD_HOTEL_BOOKING_FAIL:
      console.log('hotel booking reduceer FAIL');
      return Object.assign({}, state, {
        bookingSaved: false,
      });


    default:
      return state;
  }
};
export default HotelNewBookingReducer;
