import CONSTANTS from '../constants/actionConstants';

const initialState = {
  error: '',
  EditParnterUser: false,
};

const EditHotelPartnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.EDIT_HOTEL_PARTNER_SUCCESS:
      console.log('add partner reduceer success');
      return Object.assign({}, state, {
        EditParnterUser: true,
      });
    case CONSTANTS.EDIT_HOTEL_PARTNER_SUCCESS_AFTER:
      console.log('add partner reduceer success');
      return Object.assign({}, state, {
        EditParnterUser: false,
      });
    case CONSTANTS.EDIT_HOTEL_PARTNER_FAIL:
      console.log('add partner reduceer FAIL');
      return Object.assign({}, state, {
        EditParnterUser: false,
      });
    default:
      return state;
  }
};
export default EditHotelPartnerReducer;
