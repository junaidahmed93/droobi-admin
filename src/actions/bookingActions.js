import CONSTANTS from '../constants/actionConstants';
import * as LoaderActions from './loaderActions';
import GetBookingSource from '../sources/GetBookingSource';
import * as NotificationActions from './NotificationActions';
import NewBookingSource from '../sources/NewBookingSource';

export function getBookingSuccess(bookings) {
  const action = {
    type: CONSTANTS.GET_BOOKING_SUCCESS,
    bookings,
  };
  return action;
}

export function getBookingFail(message) {
  const action = {
    type: CONSTANTS.GET_BOOKING_FAIL,
    message,
  };
  return action;
}

export function cancelBooking(booking) {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return NewBookingSource.cancelBooking(booking)
      .then(() => {
        dispatch(LoaderActions.loaderStop());
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        NotificationActions.showNotification(err.message);
      });
  };
}
export function getAllBookings() {
  return (dispatch) => {
    // dispatch(LoaderActions.loaderStart());
    return GetBookingSource.getAllBookings()
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        if (res && res.requestedResult === true) {
          const bookings = [];
          res.data.forEach((element) => {
            const obj = Object.assign({}, element.userDto, element.bookingDto, { bookingId: element.bookingDto.id });
            bookings.push(obj);
          });
          dispatch(getBookingSuccess(bookings));
        } else {
          dispatch(NotificationActions.showNotification(res.message));
        }
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(getBookingFail());
        NotificationActions.showNotification(err.message);
        console.log('addUserActions error', err);
      });
  };
}

export function editBooking(booking) {
  console.log('new booking', booking);
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    return NewBookingSource.editBooking(booking)
      .then(() => {
        dispatch(LoaderActions.loaderStop());
        // dispatch(newHotelBookingSuccess(res.data));
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        // dispatch(newBookingFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}
