import CONSTANTS from '../constants/actionConstants';

const initialState = {
  error: '',
  savedUser: false,
};

const AddHotelPartnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_HOTEL_PARTNER_SUCCESS:
      console.log('add partner reduceer success');
      return Object.assign({}, state, {
        savedUser: true,
      });
    case CONSTANTS.ADD_HOTEL_PARTNER_SUCCESS_AFTER:
      console.log('add partner reduceer success');
      return Object.assign({}, state, {
        savedUser: false,
      });
    case CONSTANTS.ADD_HOTEL_PARTNER_FAIL:
      console.log('add partner reduceer FAIL');
      return Object.assign({}, state, {
        saveUser: false,
      });


    default:
      return state;
  }
};
export default AddHotelPartnerReducer;
