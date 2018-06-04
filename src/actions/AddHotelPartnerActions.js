import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import AddHotelPartnerSource from '../sources/AddHotelPartnerSource';
import * as NotificationActions from './NotificationActions';

export function AddhotelPartnerSuccess() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_PARTNER_SUCCESS,
  };
  return action;
}
export function AddhotelPartnerFail() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_PARTNER_FAIL,
  };
  return action;
}
export function AddhotelPartnerSuccessAfter() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_PARTNER_SUCCESS_AFTER,
  };
  return action;
}

export function addHotelPartner(user) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return AddHotelPartnerSource.addHotelPartner(user)
      .then((res) => {
        dispatch(loaderActions.loaderStop());
        dispatch(AddhotelPartnerSuccess());
        console.log('addUserActions response', res);
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(AddhotelPartnerFail());
        dispatch(NotificationActions.showNotification(err.message || '1'));
        console.log('addUserActions error', err);
      });
  };
}
