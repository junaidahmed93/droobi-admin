import CONSTANTS from '../constants/actionConstants';

const initialState = {
  hotelBookings: [],
};
const HotelBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_BOOKING_SUCCESS: {
      const bookings = action && action.hotelBookings ? action.hotelBookings.reverse() : action.bookings;
      return {
        ...state, hotelBookings: bookings,
      };
    }
    case CONSTANTS.GET_BOOKING_FAIL:
      return {
        ...state, hotelBookings: [],
      };
    default:
      return state;
  }
};
export default HotelBookingReducer;
