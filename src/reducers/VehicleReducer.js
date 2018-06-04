import CONSTANTS from '../constants/actionConstants';

const initialState = {
  addVehicleSuccess: false,
  vehicleList: [],
  vehicleProfile: [],
  error: '',
  vehicleListSuccess: false,
  vehicleProfileSuccess: false,
};

const VehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_VEHICLE_SUCCESS:
      return Object.assign({}, state, {
        addVehicleSuccess: true,
      });
    case CONSTANTS.ADD_VEHICLE_FAIL:
      return Object.assign({}, state, {
        addVehicleSuccess: false,
      });
    case CONSTANTS.GET_VEHICLE_SUCCESS:
      return Object.assign({}, state, {
        vehicleListSuccess: true,
        vehicleList: action.vehicle,
      });
    case CONSTANTS.GET_VEHICLE_FAIL:
      return Object.assign({}, state, {
        vehicleListSuccess: false,
      });
    case CONSTANTS.GET_VEHICLE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        vehicleProfileSuccess: true,
        vehicleProfile: action.vehicle,
      });
    case CONSTANTS.GET_VEHICLE_PROFILE_FAIL:
      return Object.assign({}, state, {
        vehicleProfileSuccess: false,
      });
    case CONSTANTS.CLEAR_VEHICLE_PROFILE:
      return Object.assign({}, state, {
        vehicleProfile: [],
        vehicleProfileSuccess: false,
      });
    default:
      return state;
  }
};
export default VehicleReducer;
