import CONSTANTS from '../constants/actionConstants';

const initialState = {
  addOpsporterSucees: false,
  opsporterList: [],
  error: '',
  opsporterListSuccess: false,
  opsporterProfileSuccess: false,
};
const opsporterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_OPSPORTER_SUCCESS:
      return Object.assign({}, state, {
        addOpsporterSucees: true,
      });
    case CONSTANTS.ADD_OPSPORTER_FAIL:
      return Object.assign({}, state, {
        addOpsporterSucees: false,
      });
    case CONSTANTS.GET_OPSPORTER_SUCCESS:
      return Object.assign({}, state, {
        opsporterListSuccess: true,
        opsporterList: action.opsprter,
      });
    case CONSTANTS.GET_OPSPORTER_FAIL:
      return Object.assign({}, state, {
        opsporterListSuccess: false,
      });
    case CONSTANTS.GET_OPSPORTER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        opsporterProfileSuccess: true,
        opsporterProfile: action.opsporter,
      });
    case CONSTANTS.GET_OPSPORTER_PROFILE_FAIL:
      return Object.assign({}, state, {
        opsporterProfileSuccess: false,
      });
    default:
      return state;
  }
};
export default opsporterReducer;
