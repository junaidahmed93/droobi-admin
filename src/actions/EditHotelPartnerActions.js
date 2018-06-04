import { browserHistory } from 'react-router';
import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import * as NotificationActions from './NotificationActions';
import EditHotelPartnerSource from '../sources/EditHotelPartnerSource';

export function EdithotelPartnerSuccess() {
  const action = {
    type: CONSTANTS.EDIT_HOTEL_PARTNER_SUCCESS,
  };
  return action;
}
export function EdithotelPartnerFail() {
  const action = {
    type: CONSTANTS.EDIT_HOTEL_PARTNER_FAIL,
  };
  return action;
}
export function EdithotelPartnerSuccessAfter() {
  const action = {
    type: CONSTANTS.EDIT_HOTEL_PARTNER_SUCCESS_AFTER,
  };
  return action;
}

export function editHotelPartner(user) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return EditHotelPartnerSource.editHotelPartner(user)
      .then((res) => {
        dispatch(loaderActions.loaderStop());
        dispatch(EdithotelPartnerSuccess());
        console.log('addUserActions response', res);
        browserHistory.push('/home/admin/hotel-partner');
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(EdithotelPartnerFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('Edit hotel partner', err);
      });
  };
}

