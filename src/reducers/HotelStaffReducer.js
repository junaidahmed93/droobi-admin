import CONSTANTS from '../constants/actionConstants';
// import initialState from "../store/initialState";
const initialState = {
  staffList: [],
  staffProfile: [],
  error: '',
  getStaffSuccess: false,
  hotelStaffProfileSuccess: false,
  hotelStaffProfileUpdateSuccess: false,
};
const HotelStaffReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_HOTEL_STAFF_SUCCESS:
      return Object.assign({}, state, {
        getStaffSuccess: true,
        staffList: action.staffList.data.adminList,
        error: '',
      });
    case CONSTANTS.GET_HOTEL_STAFF_FAIL:
      return Object.assign({}, state, {
        getStaffSuccess: false,
      });
    case CONSTANTS.GET_HOTEL_STAFF_SUCCESS_AFTER:
      console.log('add user reduceer FAIL');
      return Object.assign({}, state, {
        getStaffSuccess: false,
      });
    case CONSTANTS.GET_HOTEL_STAFF_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        hotelStaffProfileSuccess: true,
        staffProfile: action.hotelStaffProfile,
      });
    case CONSTANTS.GET_HOTEL_STAFF_PROFILE_FAIL:
      return Object.assign({}, state, {
        hotelStaffProfileSuccess: false,
      });
    case CONSTANTS.UPDATE_HOTEL_STAFF_SUCCESS:
      return Object.assign({}, state, {
        hotelStaffProfileUpdateSuccess: true,
      });
    case CONSTANTS.UPDATE_HOTEL_STAFF_FAIL:
      return Object.assign({}, state, {
        hotelStaffProfileUpdateSuccess: false,
      });

    default:
      return state;
  }
};
export default HotelStaffReducer;
