import CONSTANTS from '../constants/actionConstants';
import FlightStatsSource from '../sources/FlightStatsSource';
import * as LoaderActions from './loaderActions';
import * as NotificationActions from './NotificationActions';


export function flightStatsSuccess(flightDetails) {
  console.log('flightDetails,', flightDetails);
  const action = {
    type: CONSTANTS.FLIGHT_STATS_SUCCESS,
    flightDetails,
  };
  return action;
}

export function flightStatsFail() {
  const action = {
    type: CONSTANTS.FLIGHT_STATS_FAIL,
  };
  return action;
}

export function flightStatsSuccessAfter() {
  const action = {
    type: CONSTANTS.FLIGHT_STATS_SUCCESS_AFTER,
  };
  return action;
}

export function getFlightStats(flightInput) {
  return (dispatch) => {
    dispatch(LoaderActions.loaderStart());
    dispatch(flightStatsSuccessAfter());
    return FlightStatsSource.getFlightStats(flightInput)
      .then((res) => {
        dispatch(LoaderActions.loaderStop());
        if (res.requestedResult === true) {
          dispatch(flightStatsSuccess(res.data));
        }
        if (res.requestedResult === false) {
          dispatch(flightStatsFail());
          dispatch(NotificationActions.showNotification('No Scheduled flight'));
        }
      })
      .catch((err) => {
        dispatch(LoaderActions.loaderStop());
        dispatch(flightStatsFail());
        dispatch(NotificationActions.showNotification(err.message));
        console.log('addUserActions error', err);
      });
  };
}
