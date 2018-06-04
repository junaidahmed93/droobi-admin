import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import * as NotificationActions from './NotificationActions';
import GetHotelPartnerSource from '../sources/GetHotelPartnerSource';

export function getHotelPartnerSuccess(partnerList) {
  console.log('getUserSuccess', partnerList);
  const action = {
    type: CONSTANTS.GET_HOTEL_PARTNER_SUCCESS,
    partnerList,
  };
  return action;
}
export function getHotelPartnerFail() {
  const action = {
    type: CONSTANTS.GET_HOTEL_PARTNER_FAIL,
  };
  return action;
}


export function getHotelPartnerUsers() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return GetHotelPartnerSource.getHotelPartnerUsers()
      .then((partner) => {
        dispatch(loaderActions.loaderStop());
        console.log('PARTNER', partner);
        dispatch(getHotelPartnerSuccess(partner.data));
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getHotelPartnerFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}
