import CONSTANTS from '../constants/actionConstants';
import * as NotificationActions from './NotificationActions';
import * as loaderActions from './loaderActions';
import CommonSource from '../sources/CommonSource';

export function getCountyListSuccess(countryList) {
  console.log('getUserSuccess', countryList);
  const action = {
    type: CONSTANTS.GET_COUNTRY_LIST_SUCCESS,
    countryList,
  };
  return action;
}
export function getCountryListFail() {
  const action = {
    type: CONSTANTS.GET_COUNTRY_LIST_FAIL,
  };
  return action;
}

export function getAirportListSuccess(airportList) {
  const action = {
    type: CONSTANTS.GET_AIRPORT_LIST_SUCCESS,
    airportList,
  };
  return action;
}
export function getAirportListFail() {
  const action = {
    type: CONSTANTS.GET_AIRPORT_LIST_FAIL,
  };
  return action;
}

export function getServiceAreaListSuccess(serviceAreaList) {
  const action = {
    type: CONSTANTS.GET_SERVICE_AREA_LIST_SUCCESS,
    serviceAreaList,
  };
  return action;
}
export function getServiceAreaListFail() {
  const action = {
    type: CONSTANTS.GET_SERVICE_AREA_LIST_FAIL,
  };
  return action;
}

export function getCancelBookingReasonSuccess(bookingCancelReasonList) {
  const action = {
    type: CONSTANTS.GET_BOOKING_CANCEL_REASON_SUCCEES,
    bookingCancelReasonList,
  };
  return action;
}
export function getCancelBookingReasonFail() {
  const action = {
    type: CONSTANTS.GET_BOOKING_CANCEL_REASON_FAIL,
  };
  return action;
}

export function getAllCountries() {
  return dispatch =>
  // dispatch(loaderActions.loaderStart());
    CommonSource.getCountryList()
      .then((countries) => {
        dispatch(getCountyListSuccess(countries));
        // dispatch(loaderActions.loaderStop());
        console.log('addUserActions response', countries);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(getCountryListFail());
        // dispatch(loaderActions.loaderStop())
        dispatch(NotificationActions.showNotification('Some services are not loaded for country. Please refresh'));
        console.log('addUserActions error', err);
      });
}


export function getAirports() {
  return dispatch =>
  // dispatch(loaderActions.loaderStart());
    CommonSource.getAirports()
      .then((airports) => {
        console.log('This is passing to reducer getAirports', airports);
        dispatch(getAirportListSuccess(airports));
        // dispatch(loaderActions.loaderStop());
        console.log('addUserActions response', airports);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(getAirportListFail());
        // dispatch(loaderActions.loaderStop())
        dispatch(NotificationActions.showNotification('Some services are not loaded for airport. Please refresh'));
        console.log('addUserActions error', err);
      });
}

export function getServiceAreas() {
  return dispatch =>
  // dispatch(loaderActions.loaderStart());
    CommonSource.getServiceArea()
      .then((serviceArea) => {
        console.log('This is passing to reducer getServiceArea', serviceArea);
        dispatch(getServiceAreaListSuccess(serviceArea));
        // dispatch(loaderActions.loaderStop());
        console.log('addUserActions response', serviceArea);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(getServiceAreaListFail());
        // dispatch(loaderActions.loaderStop())
        dispatch(NotificationActions.showNotification('Some services are not loaded for service area. Please refresh'));
        console.log('addUserActions error', err);
      });
}

export function getBookingCancelReasons() {
  return dispatch =>
  // dispatch(loaderActions.loaderStart());
    CommonSource.getBookingCancelReasons()
      .then((serviceArea) => {
        console.log('This is passing to reducer getServiceArea', serviceArea);
        dispatch(getCancelBookingReasonSuccess(serviceArea));
        // dispatch(loaderActions.loaderStop());
        console.log('addUserActions response', serviceArea);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(getCancelBookingReasonFail());
        // dispatch(loaderActions.loaderStop())
        dispatch(NotificationActions.showNotification('Some services are not loaded for service area. Please refresh'));
        console.log('addUserActions error', err);
      });
}

export function staffDeActivation(id, staff) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return CommonSource.staffDeActivation(id, staff)
      .then((serviceArea) => {
        console.log('Deactivate', serviceArea);
        dispatch(loaderActions.loaderStop());
        dispatch(getCancelBookingReasonSuccess(serviceArea));
        console.log('addUserActions response', serviceArea);
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getCancelBookingReasonFail());
        dispatch(NotificationActions.showNotification('Some services are not loaded for service area. Please refresh'));
        console.log('addUserActions error', err);
      });
  };
}

export function staffActivation(id, staff) {
  return (dispatch) => {
    dispatch(loaderActions.loaderStart());
    return CommonSource.staffActivation(id, staff)
      .then((serviceArea) => {
        dispatch(loaderActions.loaderStop());
        console.log('Activate', serviceArea);
        dispatch(getCancelBookingReasonSuccess(serviceArea));
        console.log('addUserActions response', serviceArea);
        // dispatch(addUserSuccessAfter())
      })
      .catch((err) => {
        dispatch(loaderActions.loaderStop());
        dispatch(getCancelBookingReasonFail());
        dispatch(NotificationActions.showNotification('Some services are not loaded for service area. Please refresh'));
        console.log('addUserActions error', err);
      });
  };
}
