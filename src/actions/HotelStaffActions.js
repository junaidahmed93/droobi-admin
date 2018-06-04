import CONSTANTS from '../constants/actionConstants';
import * as loaderActions from './loaderActions';
import * as NotificationActions from './NotificationActions';
import HotelStaffSource from '../sources/HotelStaffSource';

export function addHotelStaffSuccess(hotelStaff) {
  const action = {
    type: CONSTANTS.ADD_HOTEL_STAFF_SUCCESS,
    hotelStaff,
  };
  return action;
}
export function addHotelStaffFail() {
  const action = {
    type: CONSTANTS.ADD_HOTEL_STAFF_FAIL,
  };
  return action;
}

export function getHotelStaffSuccess(staffList) {
  const action = {
    type: CONSTANTS.GET_HOTEL_STAFF_SUCCESS,
    staffList,
  };
  return action;
}
export function getHotelStaffFail() {
  const action = {
    type: CONSTANTS.GET_HOTEL_STAFF_FAIL,
  };
  return action;
}

export function getHotelStaffProfileSuccess(hotelStaffProfile) {
  const action = {
    type: CONSTANTS.GET_HOTEL_STAFF_PROFILE_SUCCESS,
    hotelStaffProfile,
  };
  return action;
}

export function getHotelStaffProfileFail() {
  const action = {
    type: CONSTANTS.GET_HOTEL_STAFF_PROFILE_FAIL,
  };
  return action;
}

export function hotelStaffUpdateSuccess() {
  const action = {
    type: CONSTANTS.UPDATE_HOTEL_STAFF_SUCCESS,
  };
  return action;
}

export function HotelStaffUpdateFail() {
  const action = {
    type: CONSTANTS.UPDATE_HOTEL_STAFF_FAIL,
  };
  return action;
}

export function HotelStaffProfile(id) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return HotelStaffSource.HotelStaffProfile(id)
      .then((HotelStaff) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getHotelStaffProfileSuccess(HotelStaff.data));
        console.log('Porter profile', HotelStaff);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getHotelStaffProfileFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('Error in porter profile', err);
      });
  };
}
export function addHotelStaff(staff) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return HotelStaffSource.addHotelStaff(staff)
      .then((HotelStaff) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addHotelStaffSuccess(HotelStaff));
        console.log('addUserActions response', HotelStaff);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(addHotelStaffFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}

export function getHotelStaff() {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return HotelStaffSource.getAllHotelStaff()
      .then((HotelStaff) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getHotelStaffSuccess(HotelStaff));
        console.log('addUserActions response', HotelStaff);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getHotelStaffFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}

export function updateHotelStaff(HotelStaff) {
  return dispatch =>
  // dispatch(loaderActions.loaderStart());
    HotelStaffSource.updateHotelStaff(HotelStaff)
      .then((updated) => {
        dispatch(loaderActions.loaderStop());
        dispatch(hotelStaffUpdateSuccess());
        console.log('addUserActions response', updated);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(HotelStaffUpdateFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
}

