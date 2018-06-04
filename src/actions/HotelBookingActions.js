import CONSTANTS from '../constants/actionConstants';
import * as LoaderActions from './loaderActions';
import GetHotelBookingSource from '../sources/GetHotelBookingSource';
import * as NotificationActions from './NotificationActions';

export function getHotelBookingSuccess(hotelBookings) {
  const action = {
    type: CONSTANTS.GET_HOTEL_BOOKING_SUCCESS,
    hotelBookings,
  };
  return action;
}
export function getHotelBookingFail() {
  const action = {
    type: CONSTANTS.GET_HOTEL_BOOKING_FAIL,
  };
  return action;
}


export function getAllHotelBookings() {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return GetHotelBookingSource.getAllBookings()
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        if (res && res.requestedResult === true) {
          const bookings = [];
          res.data.forEach((element) => {
            const obj = Object.assign({}, element.userDto, element.bookingDto, { bookingId: element.bookingDto.id });
            bookings.push(obj);
          });
          dispatch(getHotelBookingSuccess(bookings));
        } else {
          dispatch(NotificationActions.showNotification(res.message));
        }
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(getHotelBookingFail());
        console.log('addUserActions error', err);
      });
  };
}
