import CONSTANTS from '../constants/actionConstants';
// import initialState from "../store/initialState";
const initialState = {
  partnerList: [],
  error: '',
  partnerSuccess: false,
};
const GetHotelPartnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_HOTEL_PARTNER_SUCCESS:
      return Object.assign({}, state, {
        partnerSuccess: true,
        partnerList: action.partnerList,
        error: '',
      });
    case CONSTANTS.GET_HOTEL_PARTNER_FAIL:
      return Object.assign({}, state, {
        partnerSuccess: false,
      });
    case CONSTANTS.GET_HOTEL_PARTNER_SUCCESS_AFTER:
      console.log('add user reduceer FAIL');
      return Object.assign({}, state, {
        partnerSuccess: false,
      });


    default:
      return state;
  }
};
export default GetHotelPartnerReducer;
