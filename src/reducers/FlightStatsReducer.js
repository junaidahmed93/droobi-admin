import CONSTANTS from '../constants/actionConstants';
// import initialState from "../store/initialState";
const initialState = {
  flightDetails: {},
  error: '',
  flightStatsSuccess: false,
};

const FlightStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.FLIGHT_STATS_SUCCESS:
      return Object.assign({}, state, {
        flightStatsSuccess: true,
        flightDetails: action.flightDetails,
        error: ' ',
      });
    case CONSTANTS.FLIGHT_STATS_FAIL:
      return Object.assign({}, state, {
        flightStatsSuccess: false,
        flightDetails: {},
        error: 'No Flight Schedule',
      });
    case CONSTANTS.FLIGHT_STATS_SUCCESS_AFTER:
      console.log('flight after FAIL');
      return Object.assign({}, state, {
        flightStatsSuccess: false,
        flightDetails: {},
        error: ' ',
      });


    default:
      return state;
  }
};
export default FlightStatsReducer;
