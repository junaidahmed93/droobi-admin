import CONSTANTS from '../constants/actionConstants';
import HotelNewBookingSource from '../sources/HotelNewBookingSource';
import * as LoaderActions from './loaderActions';
import * as NotificationActions from './NotificationActions';

export function addHotelBookingSuccess() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_BOOKING_SUCCESS,

  };
  return action;
}
export function addHotelBookingFail() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_BOOKING_FAIL,

  };
  return action;
}

export function addHotelBookingSuccessAfter() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_BOOKING_SUCCESS_AFTER,

  };
  return action;
}

export function addNewBooking(booking) {
  console.log('Remote User saving', booking);
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return HotelNewBookingSource.addNewBooking(booking)
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        if (res && res.requestedResult === true) {
          dispatch(addHotelBookingSuccess());
        } else {
          dispatch(NotificationActions.showNotification(res.message));
        }
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(addHotelBookingFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}

