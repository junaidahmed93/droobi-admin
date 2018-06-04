import CONSTANTS from '../constants/actionConstants';

const initialState = {
  error: '',
  vehicleSaved: false,
};
const AddVehicleReducer = (state = initialState, action) => {
  switch (action) {
    case CONSTANTS.ADD_VEHICLE_SUCCESS:
      console.log('Add vehicle success');
      return Object.assign({}, state, { vehicleSaved: true });
    case CONSTANTS.ADD_VEHICLE_FAIL:
      console.log('Add vehicle fail');
      return Object.assign({}, state, { vehicleSaved: false });
    default:
      return state;
  }
};

export default AddVehicleReducer;
